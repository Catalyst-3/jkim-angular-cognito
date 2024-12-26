export const environment = {
  production: true,
  envName: "production",
  userPoolId: '${process.env.USER_POOL_ID || ""}',
  userPoolClientId: '${process.env.USER_POOL_CLIENT_ID || ""}',
};
