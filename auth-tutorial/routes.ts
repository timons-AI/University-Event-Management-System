/**
 * An array of routes that are accessible to the public
 * These routes are accessible without authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"]; // eg   "/guest/listing", "/guest/another-page"

/**
 * An array of routes thar are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The prefix for the API authentication routes
 * Routes that start with this prefix are used for authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after a successful login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
