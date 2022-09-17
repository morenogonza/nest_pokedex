export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB || 3000,
  port: process.env.PORT,
  defaultLimit: process.env.DEFAULT_LIMIT,
});
