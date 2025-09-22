import rootConfig from '../../eslint.config.js';

export default [
  ...rootConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Config package specific rules
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': 'off', // Config might need console for debugging
      'no-undef': 'off', // Allow globals like process, window
    },
  },
];
