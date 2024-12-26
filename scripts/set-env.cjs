var fs = require("fs");
var dotenv = require("dotenv");
// Load environment variables from .env
dotenv.config();
// Define the target environment file
var targetPath = "./src/environments/environment.development.ts";
// Build the environment file content
var environmentFileContent = "\nexport const environment = {\n  production: false,\n  envName: \"development\",\n  userPoolId: '".concat(process.env.USER_POOL_ID || "", "',\n  userPoolClientId: '").concat(process.env.USER_POOL_CLIENT_ID || "", "',\n};\n");
// Write the content to the environment file
fs.writeFileSync(targetPath, environmentFileContent);
console.log("Environment file generated at ".concat(targetPath));
