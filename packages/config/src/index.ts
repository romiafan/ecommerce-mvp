export * from './constants';

// Utility functions for configuration
export const getConfig = (key: string, defaultValue?: unknown) => {
  if (typeof window !== 'undefined') {
    // Client-side: use environment variables passed from server
    return (
      (window as unknown as { __ENV?: Record<string, unknown> }).__ENV?.[key] ||
      defaultValue
    );
  } else {
    // Server-side: use process.env
    return process.env[key] || defaultValue;
  }
};

export const isDevelopment = () => getConfig('NODE_ENV') === 'development';
export const isProduction = () => getConfig('NODE_ENV') === 'production';
export const isTest = () => getConfig('NODE_ENV') === 'test';
