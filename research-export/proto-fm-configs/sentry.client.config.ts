import * as Sentry from "@sentry/nextjs";

/**
 * Sentry initialization for error tracking.
 * Set SENTRY_DSN in .env to enable. If not set, Sentry runs in no-op mode.
 * Free tier: 5,000 errors/month at sentry.io
 */

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    profilesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    environment: process.env.NODE_ENV || "development",
    // Filter out noisy errors
    ignoreErrors: [
      "ResizeObserver loop limit exceeded",
      "Network request failed",
    ],
  });
}
