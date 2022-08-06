module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "next/core-web-vitals",
        "plugin:import/recommended",
        "plugin:import/warnings",
        "prettier"
      ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "import/order": [
          "error",
          {
            "alphabetize": {
              "order": "asc"
            }
          }
        ]
    }
}
