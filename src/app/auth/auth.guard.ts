import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const groups = await this.authService.fetchUserGroups();

    if (groups && groups.includes("admin")) {
      return true;
    } else {
      console.log("Access Denied: Admins Only");
      this.router.navigate(["/unauthorized"]);
      return false;
    }
  }
}
