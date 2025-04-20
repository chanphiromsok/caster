/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["en", "km"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"]
    }
  ],
  format: "po"
};
