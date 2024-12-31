import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { Observable } from "rxjs";
import { AuthUser } from "aws-amplify/auth";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  user$: Observable<AuthUser | null>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.authService.fetchCurrentUser();
  }
}
