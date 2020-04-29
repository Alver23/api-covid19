export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  GOV: {
    TOKEN: process.env.APP_GOV_TOKEN,
    BASE_URL: process.env.APP_GOV_BASE_URL,
    PATH: process.env.APP_GOV_PATH,
  },
  APP_HTTP_TIMEOUT: process.env.APP_HTTP_TIMEOUT,
  APP_HTTP_MAX_REDIRECTS: process.env.APP_HTTP_MAX_REDIRECTS,
  SENTRY_DNS: process.env.SENTRY_DNS,
});
