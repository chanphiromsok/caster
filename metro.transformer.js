const upstreamTransformer = require("@expo/metro-config/babel-transformer");
const linguiTransformer = require("@lingui/metro-transformer/expo");

module.exports.transform = function ({ src, filename, options }) {
  if (filename.endsWith(".po")) {
    return linguiTransformer.transform({ src, filename, options });
  }
  return upstreamTransformer.transform({ src, filename, options });
};
