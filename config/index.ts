export const EMAIL_REGEX = /^\S+@\S+$/i;
export const PRODUCTION = process.env.NODE_ENV === "production";
export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const TEST = process.env.NODE_ENV === "test";
export const ALERT_SLICE = "alert";
