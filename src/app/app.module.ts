import { AuthModule } from "angular-auth-oidc-client";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AmplifyAuthenticatorModule } from "@aws-amplify/ui-angular";
import { FormsModule } from "@angular/forms";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    FormsModule,
    AuthModule.forRoot({
      config: {
        authority: `https://cognito-idp.us-east-2.amazonaws.com/${environment.userPoolId}`,
        redirectUrl: "http://localhost:5173",
        clientId: environment.userPoolClientId,
        scope: "email openid",
        responseType: "code",
      },
    }),
  ],
  exports: [AuthModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
