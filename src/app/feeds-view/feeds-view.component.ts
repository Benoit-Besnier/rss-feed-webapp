import { Component, OnInit } from "@angular/core";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";

import { FeedsClientService } from "../client/feeds.service";
import { Feed } from "../entities/Feed";

@Component({
  selector: "app-feeds-view",
  templateUrl: "./feeds-view.component.html",
  styleUrls: ["./feeds-view.component.scss"]
})
export class FeedsViewComponent implements OnInit {
  private feeds: Feed[] = [];

  constructor(private feedsClient: FeedsClientService) {}

  ngOnInit() {
    this.updateFeeds();
  }

  public updateFeeds(): void {
    this.feedsClient.getAllFeeds().subscribe(
      (feeds: Feed[]) => {
        this.feeds = feeds;
      },
      (error: HttpErrorResponse) => {
        // Keep current content but push a snack to notify user
        console.log(error);
      }
    );
  }
}
