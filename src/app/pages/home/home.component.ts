import { Component, OnInit } from "@angular/core";
import { AuthService, CustomUser } from "../../auth/auth.service";
import { CommonModule } from "@angular/common";
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  user: CustomUser | null = null;
  isLoggedIn: boolean = false;
  userEmail: string | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = !!user;
      this.userEmail = user?.signInDetails?.loginId;
    });
  }

  async onLogout(): Promise<void> {
    await this.authService.logout();
  }
}
