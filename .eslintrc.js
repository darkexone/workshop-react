module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["prettier", "jsx-a11y"],
  rules: {
    "prettier/prettier": ["error"],
    "linebreak-style": 0,
    "react/react-in-jsx-scope": 0,
    "max-len": [
      "error",
      {
        code: 80,
      },
    ],
    "import/prefer-default-export": 0,
  },
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: true,
    requireConfigFile: false,
  },
};
