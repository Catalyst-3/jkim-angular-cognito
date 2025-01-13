const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

// Define the target environment folder and file
const environmentsFolder = path.join(__dirname, "../src/environments");
const targetPath = path.join(environmentsFolder, "environment.ts");

// Create the environments folder if it doesn't exist
if (!fs.existsSync(environmentsFolder)) {
  fs.mkdirSync(environmentsFolder, { recursive: true });
}

// Define the environment variables
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
