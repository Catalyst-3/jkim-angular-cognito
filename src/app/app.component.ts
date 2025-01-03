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
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.fetchCurrentUser();
  }
}
