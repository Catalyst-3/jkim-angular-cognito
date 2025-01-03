import { Component } from "@angular/core";
import { AuthUser } from "aws-amplify/auth";

import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  user$: Observable<AuthUser | null>;
  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
    this.isAdmin$ = this.authService.isAdmin$;
  }
}
