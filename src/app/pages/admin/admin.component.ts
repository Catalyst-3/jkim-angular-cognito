import { Component, OnInit } from "@angular/core";
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
export class AdminComponent implements OnInit {
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
