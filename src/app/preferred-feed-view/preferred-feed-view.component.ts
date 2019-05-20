import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { MatSnackBar } from "@angular/material";

import { FeedsClientService } from "../client/feeds.service";
import { UserSessionService } from "../services/user-session.service";
import { UserDetailsService } from "../services/user-details.service";

import { Feed } from "../entities/Feed";

@Component({
  selector: "app-preferred-feed-view",
  templateUrl: "./preferred-feed-view.component.html",
  styleUrls: ["./preferred-feed-view.component.scss"]
})
export class PreferredFeedViewComponent implements OnInit {
  preferredFeeds: Feed[] = [];

  constructor(
    private router: Router,
    private session: UserSessionService,
    private snackBar: MatSnackBar,
    private details: UserDetailsService,
    private feedsClient: FeedsClientService
  ) {}

  ngOnInit() {
    if (!this.isAuthenticated()) {
      this.router.navigate(["/login"]);
      this.snackBar.open("You should login first", "", { duration: 2000 });
    } else {
      this.getAllPreferredFeeds();
    }
  }

  private updatePreferredFeeds(): void {
    this.cleanPreferredFeeds();
    this.getAllPreferredFeeds();
  }

  private cleanPreferredFeeds(): void {
    this.preferredFeeds = [];
  }

  private getAllPreferredFeeds(): void {
    let preferredUuids: string[] = this.details.getDetails().preferredFeeds;

    preferredUuids.forEach((preferredUuid: string) => {
      this.feedsClient
        .getFeed(preferredUuid, this.session.getSessionToken())
        .subscribe(
          (feed: Feed) => {
            if (feed && feed != null && feed.uuid != null) {
              this.preferredFeeds.push(feed);
            }
          },
          (error: HttpErrorResponse) => {
            this.snackBar.open("Couldn't fetch a feed.");
            console.error(error);
          }
        );
    });
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
    this.updatePreferredFeeds();
  }
}
