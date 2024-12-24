import { AuthModule } from "angular-auth-oidc-client";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      config: {
        authority:
          "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_CxTHttVIX",
        redirectUrl: "http://localhost:5173",
        clientId: "2t9t55m36s285fj2aldi13p1gd",
        scope: "email openid",
        responseType: "code",
      },
    }),
  ],
  exports: [AuthModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
