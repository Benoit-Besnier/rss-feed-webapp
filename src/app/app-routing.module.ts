import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginViewComponent } from "./login-view/login-view.component";
import { RegisterViewComponent } from "./register-view/register-view.component";

const routes: Routes = [
  // Login
  {
    path: "login",
    component: LoginViewComponent
  },
  // Registration
  {
    path: "register",
    component: RegisterViewComponent
  },

  // // Login -> Connect
  // {
  //     path: 'home',
  //     component: BookSearchViewComponent
  // },

  // Auto-redirctY
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
