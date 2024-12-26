export const environment = {
  production: false,
  envName: "development",
  userPoolId: '${process.env.USER_POOL_ID || ""}',
  userPoolClientId: '${process.env.USER_POOL_CLIENT_ID || ""}',
};
