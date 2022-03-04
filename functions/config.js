const appEnv = process.env.APP_ENV || 'staging';
const sentryDsn = process.env.SENTRY_DSN || null;

export default config = {
  appEnv,
  sentryDsn,
};
