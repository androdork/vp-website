const SOCKET_SERVER_URL = process.env.SOCKET_SERVER_URL || "ws://localhost:8765";
const BASE_URL = process.env.BASE_URL || "http://localhost:8080";
const VP_API_URL = process.env.VP_API_URL || "http://http://127.0.0.1:8000";
const VP_CLIENT_ID = process.env.VP_CLIENT_ID || "vp-client-id";
const VP_CLIENT_SECRET = process.env.VP_CLIENT_SECRET || "vp-client-secret";

export {
  SOCKET_SERVER_URL,
  BASE_URL,
  VP_API_URL,
  VP_CLIENT_ID,
  VP_CLIENT_SECRET,
};
