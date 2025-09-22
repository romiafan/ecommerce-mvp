// Core components
export { Button, buttonVariants } from './components/button';
export { Input } from './components/input';
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/card';

// Utilities
export {
  cn,
  formatPrice,
  formatDate,
  formatDateTime,
  slugify,
  truncate,
  capitalize,
  getInitials,
} from './lib/utils';

// Types
export type { ButtonProps } from './components/button';
export type { InputProps } from './components/input';

// Re-export React for convenience
export { default as React } from 'react';
