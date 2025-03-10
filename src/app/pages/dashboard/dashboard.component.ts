import { Component, OnInit } from "@angular/core";
import { AuthUser } from "aws-amplify/auth";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  user$: Observable<AuthUser | null>;
  userEmail: string | undefined;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userEmail = user?.signInDetails?.loginId;
    });
  }
}
