import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-auth-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.css", "../../../styles.css"],
})
export class AuthFormComponent {
  activeTab: string = "signIn";

  enteredEmail: string = "";
  enteredPassword: string = "";
  enteredConfirmPassword: string = "";

  errorMessage: string = "";
  infoMessage: string = "";

  signUpCode: string = "";
  newPassword: string = "";
  isSignUpCodeSent: boolean = false;
  isSignUpComplete: boolean = false;

  isResetPasswordCodeSent: boolean = false;
  resetPasswordCode: string = "";
  isPasswordReset: boolean = false;

  constructor(private authService: AuthService) {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.errorMessage = "";
    this.infoMessage = "";

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
      await this.authService.signUp(this.enteredEmail, this.enteredPassword);

      this.isSignUpCodeSent = true;
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
      await this.authService.confirmSignUp(this.enteredEmail, this.signUpCode);
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

  async onResetPassword(): Promise<void> {
    try {
      await this.authService.resetPassword(this.enteredEmail);
      this.isResetPasswordCodeSent = true;
    } catch (error) {
      this.isResetPasswordCodeSent = false;
      if (error instanceof Error) {
        this.errorMessage =
          "Failed to send password reset email. " + error.message;
      } else {
        this.errorMessage = "An unknown error occurred.";
      }
    }
  }

  async onConfirmResetPassword(): Promise<void> {
    try {
      await this.authService.confirmResetPassword(
        this.enteredEmail,
        this.resetPasswordCode,
        this.newPassword
      );
      this.errorMessage = "";
      this.setActiveTab("signIn");
      this.infoMessage = "Password reset successfully. Please log in.";
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = "Failed to reset the password. " + error.message;
      } else {
        this.errorMessage = "An unknown error occurred.";
      }
      this.infoMessage = "";
    }
  }
}
