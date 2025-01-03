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
  user: CustomUser | null = null;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = !!user;
    });
  }

  async onLogin(): Promise<void> {
    try {
      await this.authService.login(this.enteredEmail, this.enteredPassword);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  async onLogout(): Promise<void> {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
}
