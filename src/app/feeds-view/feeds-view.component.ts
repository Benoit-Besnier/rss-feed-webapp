import { Component, OnInit, Inject } from "@angular/core";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";

import { MatDialog, MatSnackBar } from "@angular/material";

import { FeedsClientService } from "../client/feeds.service";
import { UserDetailsService } from "../services/user-details.service";
import { UserSessionService } from "../services/user-session.service";
import { AllFeedsUpdateTriggerService } from "../trigger/all-feeds-update-trigger.service";

import { DialogConfirmComponent } from "../dialog-confirm/dialog-confirm.component";

import { Feed } from "../entities/Feed";

@Component({
  selector: "app-feeds-view",
  templateUrl: "./feeds-view.component.html",
  styleUrls: ["./feeds-view.component.scss"]
})
export class FeedsViewComponent implements OnInit {
  private feeds: Feed[] = [];

  constructor(
    private feedsClient: FeedsClientService,
    private session: UserSessionService,
    private details: UserDetailsService,
    private snackBar: MatSnackBar,
    private allFeedsUpdateTrigger: AllFeedsUpdateTriggerService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.updateFeeds();
    this.allFeedsUpdateTrigger.update.subscribe(validEvent => {
      if (validEvent) {
        this.updateFeeds();
      }
    });
  }

  public updateFeeds(): void {
    this.feedsClient.getAllFeeds().subscribe(
      (feeds: Feed[]) => {
        this.feeds = feeds;
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open("Couldn't get feeds.", "", { duration: 2000 });
        console.error(error);
      }
    );
  }

  public isPreferred(uuid: string): boolean {
    let details = this.details.getDetails();

    if (this.details.areDetailsValids(details)) {
      return details.preferredFeeds.some(preferred => preferred == uuid);
    }
    return false;
  }

  public isAuthenticated(): boolean {
    return this.session.isSessionValid(this.session.getSession());
  }

  public isAdmin(): boolean {
    return this.details.isAdmin();
  }

  public togglePreferred(uuid: string): void {
    let remove: boolean;

    if (this.isPreferred(uuid)) {
      this.details.deleteInPreferred(uuid);
      remove = true;
    } else {
      this.details.addInPreferred(uuid);
      remove = false;
    }
    this.details.update(uuid, remove);
  }

  public remove(uuid: string) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: "15vw",
      data: "Do you confirm the deletion of this feed?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Removing feed ${uuid}`);
        this.feedsClient
          .deleteFeed(uuid, this.session.getSessionToken())
          .subscribe(any => {
            this.updateFeeds();
          });
      }
    });
  }
}
