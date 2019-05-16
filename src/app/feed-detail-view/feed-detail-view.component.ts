import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { UserSessionService } from "../services/user-session.service";
import { FeedsClientService } from "../client/feeds.service";

import { Feed } from "../entities/Feed";

@Component({
  selector: "app-feed-detail-view",
  templateUrl: "./feed-detail-view.component.html",
  styleUrls: ["./feed-detail-view.component.scss"]
})
export class FeedDetailViewComponent implements OnInit {
  feed: Feed;

  constructor(
    private route: ActivatedRoute,
    private feedClient: FeedsClientService,
    private session: UserSessionService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.feedClient
        .getFeed(params.get("id"), this.session.getSessionToken())
        .subscribe(
          (feed: Feed) => {
            this.feed = feed;
          },
          (error: HttpErrorResponse) => console.log(error)
        );
    });
  }
}
