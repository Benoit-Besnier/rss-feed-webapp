import { Component } from "@angular/core";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

import { UserSessionService } from "./services/user-session.service";
import { UserDetailsService } from "./services/user-details.service";

import { UserSession } from "./entities/UserSession";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "rss-feed-webapp";

  constructor(
    public session: UserSessionService,
    private details: UserDetailsService
  ) {}

  public isCurrentSessionValid(): boolean {
    return this.session.getSessionToken() != "";
  }

  public getCurrentSessionUsername(): string {
    return this.session.getSession().username;
  }

  public disconnectCurrentSession(): void {
    this.session.disconnect();
    this.details.clearDetails();
  }
}
