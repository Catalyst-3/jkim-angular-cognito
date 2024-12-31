import { Component } from "@angular/core";
import { AmplifyAuthenticatorModule } from "@aws-amplify/ui-angular";
import { AuthUser } from "aws-amplify/auth";
import { AuthService } from "../../auth/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [AmplifyAuthenticatorModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  user$: Observable<AuthUser | null>;

  constructor(public authService: AuthService) {
    this.user$ = this.authService.user$;
  }
}
