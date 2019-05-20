import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginViewComponent } from "./login-view/login-view.component";
import { RegisterViewComponent } from "./register-view/register-view.component";
import { FeedsViewComponent } from "./feeds-view/feeds-view.component";
import { FeedDetailViewComponent } from "./feed-detail-view/feed-detail-view.component";
import { PreferredFeedViewComponent } from "./preferred-feed-view/preferred-feed-view.component";

const routes: Routes = [
  {
    path: "register",
    component: RegisterViewComponent
  },
  {
    path: "feeds",
    component: FeedsViewComponent
  },
  {
    path: "feeds/:id",
    component: FeedDetailViewComponent
  },
  {
    path: "login",
    component: LoginViewComponent
  },
  {
    path: "my-feeds",
    component: PreferredFeedViewComponent
  },
  {
    path: "**",
    redirectTo: "feeds"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
