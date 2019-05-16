import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

import { MatSnackBar } from "@angular/material";

import { UserClientService } from "../client/user.service";

import { UserSession } from "../entities/UserSession";
import { UserDetails } from "../entities/UserDetails";

@Injectable({
  providedIn: "root"
})
export class UserDetailsService {
  private details: UserDetails;

  constructor(
    private userClient: UserClientService,
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

  public getDetails(): UserDetails {
    return this.details;
  }

  public clearDetails(): void {
    this.details = null;
  }

  public areDetailsValids(details: UserDetails): boolean {
    return (
      details != null &&
      details.username != null &&
      details.username != "" &&
      details.roles != null &&
      details.roles.length > 0
    );
  }
}
