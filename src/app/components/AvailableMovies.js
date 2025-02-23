import componentWithFeatureFlag from "../utils/componentWithFeatureFlag";

export default async function AvailableMovies() {
  componentWithFeatureFlag("available_content", "#AvailableMovies");
}