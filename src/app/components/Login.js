import componentWithFeatureFlag from "../utils/componentWithFeatureFlag";

export default async function Login() {
  componentWithFeatureFlag("website_login", "#Login");
}