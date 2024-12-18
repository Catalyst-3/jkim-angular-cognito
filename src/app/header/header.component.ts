import { Component } from "@angular/core";
import { AuthUser } from "aws-amplify/auth";

import { AuthService } from "../auth/auth.service";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  // user: AuthUser | null = null;
  // constructor(private authService: AuthService) {}
  // ngOnInit(): void {
  //   this.authService.getUser().subscribe((user) => {
  //     this.user = user;
  //   });
  // }
}
