import { Component, OnInit } from "@angular/core";
import { AmplifyAuthenticatorModule } from "@aws-amplify/ui-angular";
import { AuthUser, getCurrentUser, signOut } from "aws-amplify/auth";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [AmplifyAuthenticatorModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  username?: string = undefined;
  email?: string = undefined;

  async ngOnInit(): Promise<void> {
    const user: AuthUser = await getCurrentUser();
    if (user) {
      const { username, signInDetails } = user;
      this.username = username;
      this.email = signInDetails?.loginId;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut();
      console.log("User logged out successfully");
    } catch (e) {
      console.error("Error logging out:", e);
      throw e;
    }
  }
}
