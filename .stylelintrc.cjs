module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-prettier/recommended'
  ],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less'
    },
    {
      files: ['**/*.vue'],
      customSyntax: "postcss-html"
    }
  ],
  rules: {
    "declaration-property-value-no-unknown": true,
    'no-descending-specificity': null,
    'block-no-empty': null,
  },
};
