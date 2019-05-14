import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

import {
  FormControl,
  FormGroupDirective,
  FormGroup,
  NgForm,
  Validators,
  AbstractControl
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

import { UserSessionService } from "../services/user-session.service";
import { LoginClientService } from "./login.service";

import { UserSession } from "../entities/UserSession";

@Component({
  selector: "app-login-view",
  templateUrl: "./login-view.component.html",
  styleUrls: ["./login-view.component.scss"]
})
export class LoginViewComponent implements OnInit {
  constructor(
    private loginClient: LoginClientService,
    private snackBar: MatSnackBar,
    private session: UserSessionService
  ) {}

  loginForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  ngOnInit() {}

  public onSubmit() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    this.loginClient.getLoginResponse(username, password).subscribe(
      (reponse: HttpResponse<UserSession>) => {
        let typeResponse: number = Math.floor(reponse.status / 100);

        if (typeResponse == 2 && this.session.isSessionValid(reponse.body)) {
          this.snackBar.open("Login succeed.", "", { duration: 2000 });
          this.session.connect(reponse.body);
        } else {
          this.snackBar.open(
            "Login failed. Something wrong happend, please retry.",
            "",
            { duration: 2000 }
          );
        }
      },
      (error: HttpErrorResponse) => {
        let typeError: number = Math.floor(error.status / 100);

        if (typeError == 4) {
          this.snackBar.open("Login failed. Wrong credentials.", "", {
            duration: 2000
          });
        } else {
          this.snackBar.open(
            "Registration failed. Something wrong happend, please retry.",
            "",
            { duration: 2000 }
          );
        }
      }
    );
  }

  public getUsernameErrorMessage(): string {
    let username: AbstractControl = this.loginForm.get("username");

    if (username.hasError("required")) {
      return "Username is required.";
    } else if (username.hasError("minlength")) {
      return "Username minimal lenght is 4 characters.";
    } else if (username.hasError("maxlength")) {
      return "Username cannot be lenght is 20 characters.";
    }
    return "";
  }

  public getPasswordErrorMessage(): string {
    let username: AbstractControl = this.loginForm.get("password");

    if (username.hasError("required")) {
      return "Password is required.";
    } else if (username.hasError("minlength")) {
      return "Password minimal lenght is 6 characters.";
    }
    return "";
  }
}
