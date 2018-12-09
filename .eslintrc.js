module.exports = {
  root: true,
  installedESLint: true,
  extends: 'standard',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true
  },
  plugins: ['html'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'func-call-spacing': ['error', 'never'],
    'space-before-function-paren': [2, { anonymous: 'always', named: 'always' }],
    'operator-linebreak': [
      'error',
      'after',
      {
        overrides: {
          '?': 'after',
          ':': 'before'
        }
      }
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'handle-callback-err': 0,
    'no-constant-condition': 0,
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'log']
      }
    ],
    'no-empty': 0,
    'no-new': 0,
    'no-unused-vars': 0,
    'no-labels': 0,
    'no-eq-null': 0,
    eqeqeq: 0,
    'no-eval': 0,
    'no-console': 0
  },
  globals: {
    ActiveXObject: true,
    BMap: true,
    particlesJS: true,
    define: true
  }
}
