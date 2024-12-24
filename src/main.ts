import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { AppModule } from "./app/app.module";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import outputs from "../amplify_outputs.json";

try {
  Amplify.configure(outputs);
  console.log("Amplify configured successfully:", awsconfig);
  console.log("outputs:", outputs);
} catch (e) {
  console.error("Error configuring Amplify:", e);
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
