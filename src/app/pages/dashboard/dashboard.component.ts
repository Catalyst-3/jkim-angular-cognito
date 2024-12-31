import { Component } from "@angular/core";
import { AuthUser } from "aws-amplify/auth";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
  user$: Observable<AuthUser | null>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }
}
