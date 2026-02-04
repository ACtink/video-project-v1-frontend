// utils/countryName.js

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export function getCountryNameFromCode(code) {
  if (!code) return "Unknown";

  try {
    return regionNames.of(code.toUpperCase()) || "Unknown";
  } catch {
    return "Unknown";
  }
}
