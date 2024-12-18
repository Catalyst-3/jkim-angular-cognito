import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { HeaderComponent } from "./header/header.component";
import {
  AmplifyAuthenticatorModule,
  AuthenticatorService,
} from "@aws-amplify/ui-angular";

Amplify.configure(outputs);

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AmplifyAuthenticatorModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "catalyst-3-angular-platform";

  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
  }
}
