import * as Sentry from "@sentry/nextjs";

/**
 * Sentry edge runtime initialization.
 * Set SENTRY_DSN in .env to enable.
 */
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    environment: process.env.NODE_ENV || "development",
  });
}
