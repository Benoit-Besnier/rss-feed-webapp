import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginViewComponent } from "./login-view/login-view.component";
import { RegisterViewComponent } from "./register-view/register-view.component";
import { FeedsViewComponent } from "./feeds-view/feeds-view.component";
import { FeedDetailViewComponent } from "./feed-detail-view/feed-detail-view.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    RegisterViewComponent,
    FeedsViewComponent,
    FeedDetailViewComponent
  ],
  imports: [
    // Angular default
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Angular Material
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatListModule,

    // View
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
