import componentWithFeatureFlag from "../utils/componentWithFeatureFlag";

export default async function PublicParties() {
  componentWithFeatureFlag("public_parties", "#PublicParties");
}