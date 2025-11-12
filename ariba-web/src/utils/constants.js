// Base URL for API requests
export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:7000"
    : "https://ariba-backend.onrender.com";

// API endpoints base (for REST API calls)
export const API_BASE_URL = `${BASE_URL}/api/v1`;
