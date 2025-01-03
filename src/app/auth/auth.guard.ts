import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.userGroups$.pipe(
      map((groups) => {
        if (groups && groups.includes("admins")) {
          return true;
        } else {
          console.log("Access Denied: Admins Only");
          this.router.navigate(["/unauthorized"]);
          return false;
        }
      })
    );
  }
}
