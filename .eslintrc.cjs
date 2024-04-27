module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // plugin:vue/vue3-recommended配置了其他字段，所以无需再配置vue-eslint-parser等
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    eqeqeq: 2,
    'vue/multi-word-component-names': 0,
  },
};
