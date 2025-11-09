// utils/cookieOptions.js
export const getCookieOptions = (origin) => {
  const isProduction = origin === "https://elegant-banoffee-fc2521.netlify.app";

  return {
    httpOnly: true,
    secure: isProduction, // true only for HTTPS in production
    sameSite: isProduction ? "None" : "Lax", // None for cross-origin in production, Lax locally
    path: "/",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  };
};
