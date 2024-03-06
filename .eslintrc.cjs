module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
        'vue/html-indent': ['error', 2],
        'vue/multi-word-component-names': 'off',
        'no-unused-vars': 1,
        'no-console': 1,
        'no-undef': 0,
    }
}