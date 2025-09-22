import * as React from 'react';

import { VariantProps } from 'class-variance-authority';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { ClassValue } from 'clsx';

export { default as React } from 'react';

declare const buttonVariants: (
  props?:
    | ({
        variant?:
          | 'default'
          | 'destructive'
          | 'outline'
          | 'secondary'
          | 'ghost'
          | 'link'
          | null
          | undefined;
        size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
      } & class_variance_authority_types.ClassProp)
    | undefined
) => string;
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
declare const Input: React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
>;

declare const Card: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
declare const CardHeader: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
declare const CardTitle: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLHeadingElement> &
    React.RefAttributes<HTMLParagraphElement>
>;
declare const CardDescription: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLParagraphElement> &
    React.RefAttributes<HTMLParagraphElement>
>;
declare const CardContent: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
declare const CardFooter: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;

declare function cn(...inputs: ClassValue[]): string;
declare function formatPrice(
  price: number,
  options?: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'BDT';
    notation?: Intl.NumberFormatOptions['notation'];
  }
): string;
declare function formatDate(date: Date | string | number): string;
declare function formatDateTime(date: Date | string | number): string;
declare function slugify(str: string): string;
declare function truncate(str: string, length: number): string;
declare function capitalize(str: string): string;
declare function getInitials(name: string): string;

export {
  Button,
  type ButtonProps,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  type InputProps,
  buttonVariants,
  capitalize,
  cn,
  formatDate,
  formatDateTime,
  formatPrice,
  getInitials,
  slugify,
  truncate,
};
