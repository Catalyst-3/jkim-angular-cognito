import { Component, OnInit } from "@angular/core";
import { AuthService, CustomUser } from "../../auth/auth.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  enteredEmail: string = "";
  enteredPassword: string = "";
  enteredConfirmPassword: string = "";
  user: CustomUser | null = null;
  isLoggedIn: boolean = false;
  activeTab: string = "signIn";
  errorMessage: string = "";

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = !!user;
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.errorMessage = "";
  }

  async onLogin(): Promise<void> {
    try {
      await this.authService.login(this.enteredEmail, this.enteredPassword);
    } catch (error) {
      this.errorMessage = "Login failed. Please try again.";
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
      this.errorMessage = "Sign up failed. Please try again.";
    }
  }

  async onLogout(): Promise<void> {
    await this.authService.logout();
  }
}
