import { getAPI } from "../api";

export default async function componentWithFeatureFlag(featureFlagName, component, callback = () => null) {
  const api = getAPI();
  if (!api) {
    return;
  }

  const element = document.querySelector(component);
  if (!element) {
    return;
  }

  try {
    const response = await api.featureFlagStatus(featureFlagName);
    const { enabled } = response;
    if (!enabled) {
      return;
    }

    element.classList.remove("d-none");

    callback(element);
  } catch (error) {
    console.error(error);
  }
}