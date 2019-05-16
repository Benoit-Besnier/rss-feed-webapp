import { Component, OnInit } from "@angular/core";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";

import { MatSnackBar } from "@angular/material";

import { FeedsClientService } from "../client/feeds.service";

import { Feed } from "../entities/Feed";
import { UserDetailsService } from "../services/user-details.service";

@Component({
  selector: "app-feeds-view",
  templateUrl: "./feeds-view.component.html",
  styleUrls: ["./feeds-view.component.scss"]
})
export class FeedsViewComponent implements OnInit {
  private feeds: Feed[] = [];

  constructor(
    private feedsClient: FeedsClientService,
    private details: UserDetailsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.updateFeeds();
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

  public isPreferred(uuid: string) {
    let details = this.details.getDetails();

    if (this.details.areDetailsValids(details)) {
      return details.preferredFeeds.some(preferred => preferred == uuid);
    }
    return false;
  }
}
