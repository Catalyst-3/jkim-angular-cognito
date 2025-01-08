import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-auth-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.css"],
})
export class AuthFormComponent {
  enteredEmail: string = "";
  enteredPassword: string = "";
  enteredConfirmPassword: string = "";
  activeTab: string = "signIn";
  errorMessage: string = "";

  confirmationCode: string = "";
  newPassword: string = "";
  isSignUpCodeSent: boolean = false;
  isSignUpComplete: boolean = false;

  isResetPasswordCodeSent: boolean = false;
  isPasswordReset: boolean = false;

  constructor(private authService: AuthService) {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.errorMessage = "";
    this.isSignUpCodeSent = false;
    this.isSignUpComplete = false;

    this.isResetPasswordCodeSent = false;
    this.isPasswordReset = false;
  }

  async onLogin(): Promise<void> {
    try {
      await this.authService.login(this.enteredEmail, this.enteredPassword);
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = "Login failed. " + error.message;
      } else {
        this.errorMessage = "An unknown error occurred.";
      }
    }
  }

  async onSignUp(): Promise<void> {
    if (this.enteredPassword !== this.enteredConfirmPassword) {
      this.errorMessage = "Passwords do not match";
      return;
    }

    try {
      const { isSignUpComplete } = await this.authService.signUp(
        this.enteredEmail,
        this.enteredPassword
      );

      this.isSignUpCodeSent = true;
      this.isSignUpComplete = isSignUpComplete;
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = "Sign up failed. " + error.message;
      } else {
        this.errorMessage = "An unknown error occurred.";
      }
    }
  }

  async onConfirmSignup(): Promise<void> {
    try {
      const { isSignUpComplete } = await this.authService.confirmSignUp(
        this.enteredEmail,
        this.confirmationCode
      );

      this.isSignUpComplete = isSignUpComplete;
      this.setActiveTab("signIn");
      await this.authService.login(this.enteredEmail, this.enteredPassword);
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = "Failed to confirm the code. " + error.message;
      } else {
        this.errorMessage = "An unknown error occurred.";
      }
    }
  }
}
