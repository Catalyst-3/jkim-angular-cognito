const fs = require("fs");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

// Define the target environment file
const targetPath = "./src/environments/environment.development.ts";
const userPoolId = process.env.USER_POOL_ID || "";
const userPoolClientId = process.env.USER_POOL_CLIENT_ID || "";

// Build the environment file content
const environmentFileContent = `
export const environment = {
  production: false,
  envName: "development",
  userPoolId: "${userPoolId}",
  userPoolClientId: "${userPoolClientId}",
};
`;

// Write the content to the environment file
fs.writeFileSync(targetPath, environmentFileContent);

console.log(`Environment file generated at ${targetPath}`);
