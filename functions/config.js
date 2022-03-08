const appEnv = process.env.APP_ENV || 'staging';
const sentryDsn = process.env.SENTRY_DSN || null;

const config = {
  appEnv,
  sentryDsn,
};

module.exports = config;
