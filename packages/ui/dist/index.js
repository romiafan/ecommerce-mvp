'use client';
'use strict';
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod
  )
);
var __toCommonJS = mod =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  Card: () => Card,
  CardContent: () => CardContent,
  CardDescription: () => CardDescription,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  CardTitle: () => CardTitle,
  Input: () => Input,
  React: () => import_react.default,
  buttonVariants: () => buttonVariants,
  capitalize: () => capitalize,
  cn: () => cn,
  formatDate: () => formatDate,
  formatDateTime: () => formatDateTime,
  formatPrice: () => formatPrice,
  getInitials: () => getInitials,
  slugify: () => slugify,
  truncate: () => truncate,
});
module.exports = __toCommonJS(index_exports);

// src/components/button.tsx
var React = __toESM(require('react'));
var import_react_slot = require('@radix-ui/react-slot');
var import_class_variance_authority = require('class-variance-authority');

// src/lib/utils.ts
var import_clsx = require('clsx');
var import_tailwind_merge = require('tailwind-merge');
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}
function formatPrice(price, options = {}) {
  const { currency = 'USD', notation = 'standard' } = options;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
  }).format(price);
}
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}
function formatDateTime(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date));
}
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
function truncate(str, length) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// src/components/button.tsx
var import_jsx_runtime = require('react/jsx-runtime');
var buttonVariants = (0, import_class_variance_authority.cva)(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
var Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? import_react_slot.Slot : 'button';
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      disabled: disabled || loading,
      ...props,
      children: loading
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex items-center gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                className:
                  'h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent',
              }),
              children,
            ],
          })
        : children,
    });
  }
);
Button.displayName = 'Button';

// src/components/input.tsx
var React2 = __toESM(require('react'));
var import_jsx_runtime2 = require('react/jsx-runtime');
var Input = React2.forwardRef(({ className, type, error, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)('div', {
    className: 'w-full',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)('input', {
        type,
        className: cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive focus-visible:ring-destructive',
          className
        ),
        ref,
        ...props,
      }),
      error &&
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)('p', {
          className: 'mt-1 text-sm text-destructive',
          children: error,
        }),
    ],
  });
});
Input.displayName = 'Input';

// src/components/card.tsx
var React3 = __toESM(require('react'));
var import_jsx_runtime3 = require('react/jsx-runtime');
var Card = React3.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)('div', {
    ref,
    className: cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    ),
    ...props,
  })
);
Card.displayName = 'Card';
var CardHeader = React3.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)('div', {
    ref,
    className: cn('flex flex-col space-y-1.5 p-6', className),
    ...props,
  })
);
CardHeader.displayName = 'CardHeader';
var CardTitle = React3.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)('h3', {
    ref,
    className: cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    ),
    ...props,
  })
);
CardTitle.displayName = 'CardTitle';
var CardDescription = React3.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)('p', {
    ref,
    className: cn('text-sm text-muted-foreground', className),
    ...props,
  })
);
CardDescription.displayName = 'CardDescription';
var CardContent = React3.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)('div', {
    ref,
    className: cn('p-6 pt-0', className),
    ...props,
  })
);
CardContent.displayName = 'CardContent';
var CardFooter = React3.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)('div', {
    ref,
    className: cn('flex items-center p-6 pt-0', className),
    ...props,
  })
);
CardFooter.displayName = 'CardFooter';

// src/index.ts
var import_react = __toESM(require('react'));
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    React,
    buttonVariants,
    capitalize,
    cn,
    formatDate,
    formatDateTime,
    formatPrice,
    getInitials,
    slugify,
    truncate,
  });
//# sourceMappingURL=index.js.map
