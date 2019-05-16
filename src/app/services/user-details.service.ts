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
        console.error(error);
      }
    );
  }

  public update(): void {
    this.userClient
      .putUserDetails(this.sessionClient.getSessionToken(), this.details)
      .subscribe(
        (response: HttpResponse<any>) => {
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
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
