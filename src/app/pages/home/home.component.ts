import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AmplifyAuthenticatorModule } from "@aws-amplify/ui-angular";
import { Amplify } from "aws-amplify";
// import outputs from "../../../../amplify_outputs.json";

// Amplify.configure(outputs);

@Component({
  selector: "app-home",
  standalone: true,
  imports: [AmplifyAuthenticatorModule],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  title = "homepage";

  constructor(private router: Router) {}

  navigateToDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  login() {
    localStorage.setItem("user", "true"); // Mock login
    this.router.navigate(["/dashboard"]);
  }

  logout() {
    localStorage.removeItem("user"); // Mock logout
    this.router.navigate(["/"]);
  }

  // constructor() {
  //   Amplify.configure(awsExports);
  // }

  // public formFields = {
  //   signIn: {
  //     username: {
  //       placeholder: "Enter your cool email",
  //     },
  //   },
  //   confirmVerifyUser: {
  //     confirmation_code: {
  //       label: "New Label",
  //       placeholder: "Enter your Confirmation Code:",
  //       isRequired: false,
  //     },
  //   },
  // };
}
