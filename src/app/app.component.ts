import { Component, Inject } from "@angular/core";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar
} from "@angular/material";

import { UserSessionService } from "./services/user-session.service";
import { UserDetailsService } from "./services/user-details.service";
import { FeedsClientService } from "./client/feeds.service";
import { AllFeedsUpdateTriggerService } from "./trigger/all-feeds-update-trigger.service";

import { UserSession } from "./entities/UserSession";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "rss-feed-webapp";

  constructor(
    private session: UserSessionService,
    private details: UserDetailsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private feeds: FeedsClientService,
    private allFeedsUpdateTrigger: AllFeedsUpdateTriggerService
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

  public isAuthenticated(): boolean {
    return this.session.isSessionValid(this.session.getSession());
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddFeedComponent, {
      width: "30vw",
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: DialogAddFeedData) => {
      if (result) {
        this.feeds
          .postFeed(result.feedUrl, this.session.getSessionToken())
          .subscribe(
            (response: HttpResponse<any>) => {
              this.snackBar.open("Your feed is valid !", "", {
                duration: 2000
              });
              this.allFeedsUpdateTrigger.update.emit(true);
            },
            (error: HttpErrorResponse) => {
              this.snackBar.open("Your feed is invalid.", "", {
                duration: 2000
              });
              console.error(error);
            }
          );
        console.log(`The dialog was closed ${result.feedUrl}`);
      } else {
        console.error(`Result is undefined.`);
      }
    });
  }
}

export interface DialogAddFeedData {
  feedUrl: string;
}

@Component({
  selector: "dialog-add-feed-component",
  templateUrl: "./dialog-add-feed/dialog-add-feed.component.html",
  styleUrls: ["./dialog-add-feed/dialog-add-feed.component.scss"]
})
export class DialogAddFeedComponent {
  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogAddFeedData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
