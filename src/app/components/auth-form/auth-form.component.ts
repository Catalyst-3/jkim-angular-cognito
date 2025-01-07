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
  isCodeSent: boolean = false;
  isPasswordReset: boolean = false;

  constructor(private authService: AuthService) {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.errorMessage = "";
    this.isCodeSent = false;
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
      this.errorMessage = "";
      this.setActiveTab("signIn");
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = "Sign up failed. " + error.message;
      } else {
        this.errorMessage = "An unknown error occurred.";
      }
    }
  }
}
