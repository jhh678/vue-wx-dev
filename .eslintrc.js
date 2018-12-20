module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'no-console': 'off',
    'arrow-parens': 'off',
    'generator-star-spacing': 'off',
    'no-debugger': 'off',
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off',
    'comma-dangle': 'warn',
    'eol-last': 'off',
    'spaced-comment': 'warn',
    'keyword-spacing': 'off',
    'space-in-parens': 'warn',
    eqeqeq: 'warn',
    indent: 'off',
    semi: 'off',
    'func-call-spacing': 'off',
    'no-unexpected-multiline': 'off',
    'no-useless-escape': 'off',
    'one-var': 'off',
    'no-constant-condition': 'warn',
    'no-empty': 'warn',
    'no-case-declarations': 'warn',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-v-for-key': 'warn',
    'vue/require-valid-default-prop': 'warn',
    'vue/no-side-effects-in-computed-properties': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/no-template-shadow': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/no-use-v-if-with-v-for': 'warn',
    'vue/no-v-html': 'off',
    'vue/attributes-order': 'warn',
    'vue/order-in-components': 'warn'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: ['plugin:vue/recommended', '@vue/prettier']
}
