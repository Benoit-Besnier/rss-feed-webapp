import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

import { MatSnackBar } from "@angular/material";

import { UserClientService } from "../client/user.service";
import { UserSessionService } from "./user-session.service";

import { UserSession } from "../entities/UserSession";
import { UserDetails } from "../entities/UserDetails";

@Injectable({
  providedIn: "root"
})
export class UserDetailsService {
  private details: UserDetails;

  constructor(
    private userClient: UserClientService,
    private sessionClient: UserSessionService,
    private snackBar: MatSnackBar
  ) {}

  public sync(session: UserSession): void {
    this.userClient.getUserDetails(session.token).subscribe(
      (details: UserDetails) => {
        this.details = details;
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open("Couldn't get user details", "", { duration: 2000 });
      }
    );
  }

  public update(uuid: string, remove: boolean): void {
    this.userClient
      .putUserDetails(this.sessionClient.getSessionToken(), this.details)
      .subscribe(
        (response: HttpResponse<any>) => {
          this.snackBar.open("Preferences are updated.", "", {
            duration: 2000
          });
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open("Preferences couldn't be updated. Rollback.", "", {
            duration: 2000
          });
          remove ? this.addInPreferred(uuid) : this.deleteInPreferred(uuid);
        }
      );
  }

  public deleteInPreferred(uuid: string): void {
    this.details.preferredFeeds.splice(
      this.details.preferredFeeds.indexOf(uuid),
      1
    );
  }

  public addInPreferred(uuid: string): void {
    this.details.preferredFeeds.push(uuid);
  }

  public isAdmin(): boolean {
    return this.details.roles.some(roles => roles == "ROLE_ADMIN");
  }

  public getDetails(): UserDetails {
    return this.details;
  }

  public clearDetails(): void {
    this.details = null;
  }

  public areDetailsValids(details: UserDetails): boolean {
    return (
      details != null &&
      details != undefined &&
      details.username != null &&
      details.username != "" &&
      details.roles != null &&
      details.roles.length > 0
    );
  }
}
