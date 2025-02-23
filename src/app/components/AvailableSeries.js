import componentWithFeatureFlag from "../utils/componentWithFeatureFlag";

export default async function AvailableSeries() {
  componentWithFeatureFlag("available_content", "#AvailableSeries");
}