export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:7000"
    : "https://ariba-backend.onrender.com/api/v1";
