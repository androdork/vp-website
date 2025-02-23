
import startLaizyLoading from "../utils/startLaizyLoading";

import { initAPI } from "../api";

import Login from "../components/Login";

export default function MainLayout() {
  startLaizyLoading();

  initAPI()
    .then(() => {
      Login();
    });
}