// For Socket.IO connection
export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:7000"
    : "https://ariba-backend.onrender.com";

// For REST API calls (login, etc.)
export const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:7000/api/v1"
    : "https://ariba-backend.onrender.com/api/v1";
