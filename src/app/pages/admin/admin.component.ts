import { Component } from "@angular/core";
import { AuthUser } from "aws-amplify/auth";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./admin.component.html",
})
export class AdminComponent {
  user$: Observable<AuthUser | null>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }
}
