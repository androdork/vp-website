import { SOCKET_SERVER_URL } from "./constants";
import MainLayout from "./common/MainLayout";


const url = new URL(window.location.href);
const { pathname } = url;
const path = pathname.split("/")[1] || "home";


const routes = [
  {
    path: "home",
    component: () => import("./pages/Home")
      .then(module => module.default)
      .catch(error => { throw error })
  },
  {
    path: "faqs",
    component: () => import("./pages/Faqs")
      .then(module => module.default)
      .catch(error => { throw error })
  },
];


(async () => {
  try {
    MainLayout();

    for (const route of routes) {
      if (route.path === path) {
        const Component = await route.component();
        Component();
      }
    }
    const socket = new WebSocket(SOCKET_SERVER_URL);
    socket.onopen = () => {
      console.info("Connected to server");
    };
    socket.onmessage = (event) => {
      console.info("[event]:", event);
    };
    socket.onerror = (error) => {
      console.warn("[WebSocketError]:", error);
    };
  } catch (error) {
    console.error('[VPWebsiteError]:', error);
  }
})();