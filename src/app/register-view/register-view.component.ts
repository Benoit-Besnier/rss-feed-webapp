import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  FormGroup,
  NgForm,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { RegisterClientService } from "./register.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-register-view",
  templateUrl: "./register-view.component.html",
  styleUrls: ["./register-view.component.scss"]
})
export class RegisterViewComponent implements OnInit {
  constructor(
    private registerClient: RegisterClientService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  registerForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmPassword: new FormControl("", [])
  });

  ngOnInit() {
    this.registerForm.setValidators(this.checkPasswords());
  }

  public checkPasswords(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      let password = group.controls.password.value;
      let confirmPassword = group.controls.confirmPassword.value;

      if (password !== confirmPassword) {
        group.controls.confirmPassword.setErrors({ notEquivalent: true });
      } else {
        group.controls.confirmPassword.setErrors(null);
      }
      return;
    };
  }

  public onSubmit() {
    let username = this.registerForm.value.username;
    let password = this.registerForm.value.password;

    this.registerClient.getRegisterResponse(username, password).subscribe(
      (response: any) => {
        let typeError: number = Math.floor(response.status / 100);

        if (typeError == 2) {
          this.router.navigate(["/login"]);
          this.snackBar.open(
            "Registration succeed. You may now register.",
            "",
            { duration: 2000 }
          );
        }
      },
      (error: HttpErrorResponse) => {
        let typeError: number = Math.floor(error.status / 100);

        if (typeError == 4) {
          this.snackBar.open(
            "Registration failed. The username is already used.",
            "",
            { duration: 2500 }
          );
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
    let username: AbstractControl = this.registerForm.get("username");

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
    let username: AbstractControl = this.registerForm.get("password");

    if (username.hasError("required")) {
      return "Password is required.";
    } else if (username.hasError("minlength")) {
      return "Password minimal lenght is 6 characters.";
    }
    return "";
  }
}
