module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    "@babel/plugin-transform-regenerator",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-private-methods",
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    "@babel/plugin-proposal-json-strings"
  ]
}
