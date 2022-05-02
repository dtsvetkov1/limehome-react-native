module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-native',
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'import/prefer-default-export': 'off',
    'no-use-before-define': ['error', { variables: false }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/jsx-wrap-multilines': 'off',
    'arrow-body-style': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.png'],
      },
    },
  },
};
