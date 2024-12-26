import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { AppModule } from "./app/app.module";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import outputs from "../amplify_outputs.json";
import { environment } from "./environments/environment";

console.log("This app is running in environment: ", environment.envName);

console.log("USER POOL ID: ", environment.userPoolId);

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

  console.log("Amplify configured successfully:", awsconfig);
  console.log("outputs:", outputs);
} catch (e) {
  console.error("Error configuring Amplify:", e);
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
