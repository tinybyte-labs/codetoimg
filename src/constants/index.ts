export const SITE_NAME = "CodeToImg";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://codetoimg.com"
    : "http://localhost:3000";
