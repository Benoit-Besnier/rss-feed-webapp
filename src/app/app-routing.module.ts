import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginViewComponent } from "./login-view/login-view.component";
import { RegisterViewComponent } from "./register-view/register-view.component";
import { FeedsViewComponent } from "./feeds-view/feeds-view.component";
import { FeedDetailViewComponent } from "./feed-detail-view/feed-detail-view.component";

const routes: Routes = [
  // Login

  // Registration
  {
    path: "register",
    component: RegisterViewComponent
  },
  // All feeds
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
  // Auto-redirect
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
