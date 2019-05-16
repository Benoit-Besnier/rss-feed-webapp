import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { UserSession } from "../entities/UserSession";
import { UserDetailsService } from "./user-details.service";

@Injectable({
  providedIn: "root"
})
export class UserSessionService {
  private session: UserSession;

  constructor(private router: Router, private details: UserDetailsService) {}

  public update(session: UserSession): void {
    if (this.isSessionValid(this.session) && this.isSessionValid(session)) {
      this.session = session;
    } else if (this.isSessionValid(session)) {
      this.connect(session);
    } else {
      this.disconnect();
    }
  }

  public connect(session: UserSession): void {
    this.session = session;
    this.details.sync(this.session);

    // TODO: Should refirect on "/my-feeds" (or something alike)
    this.router.navigate(["/feeds"]);
  }

  public disconnect(): void {
    this.session = null;
    this.details.clearDetails();
    this.router.navigate(["/login"]);
  }

  public getSession(): UserSession {
    return this.session;
  }

  public getSessionToken(): string {
    return this.isSessionValid(this.session) ? this.getSession().token : "";
  }

  public isSessionValid(session: UserSession): boolean {
    return (
      session != null &&
      session.username != null &&
      session.username != "" &&
      session.token != null &&
      session.token != ""
    );
  }
}
