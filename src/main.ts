import { Amplify } from "aws-amplify";
import { AppModule } from "./app/app.module";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { environment } from "./environments/environment";

try {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: environment.userPoolId,
        userPoolClientId: environment.userPoolClientId,
        identityPoolId: "",
        loginWith: {
          email: true,
        },
        signUpVerificationMethod: "code",
        userAttributes: {
          email: {
            required: true,
          },
        },
        allowGuestAccess: true,
        passwordFormat: {
          minLength: 6,
        },
      },
    },
  });
} catch (e) {
  console.error("Error configuring Amplify:", e);
  throw e;
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
