import { Component } from "@angular/core";
import { AuthService, CustomUser } from "../auth/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  user$: Observable<CustomUser | null>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }
}
