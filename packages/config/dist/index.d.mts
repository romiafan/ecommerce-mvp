declare const APP_CONFIG: {
    readonly name: "E-commerce MVP";
    readonly description: "Modern e-commerce platform built with Next.js, Convex, and JWT authentication";
    readonly url: string;
    readonly version: "1.0.0";
};
declare const API_ENDPOINTS: {
    readonly auth: {
        readonly signin: "/api/auth/signin";
        readonly signup: "/api/auth/signup";
        readonly signout: "/api/auth/signout";
    };
    readonly webhooks: {
        readonly stripe: "/api/webhooks/stripe";
        readonly midtrans: "/api/webhooks/midtrans";
    };
};
declare const ROUTES: {
    readonly home: "/";
    readonly products: "/products";
    readonly product: (id: string) => string;
    readonly cart: "/cart";
    readonly checkout: "/checkout";
    readonly dashboard: "/dashboard";
    readonly admin: "/admin";
    readonly auth: {
        readonly signin: "/auth/signin";
        readonly signup: "/auth/signup";
    };
};
declare const PAGINATION: {
    readonly defaultPageSize: 12;
    readonly maxPageSize: 100;
    readonly pageSizeOptions: readonly [12, 24, 48, 96];
};
declare const PRODUCT_CONFIG: {
    readonly maxImages: 10;
    readonly maxVariants: 20;
    readonly maxTagsPerProduct: 10;
    readonly maxReviewsPerPage: 20;
    readonly defaultCurrency: "USD";
    readonly currencySymbol: "$";
};
declare const CART_CONFIG: {
    readonly maxQuantityPerItem: 99;
    readonly maxItemsInCart: 100;
    readonly sessionDuration: number;
};
declare const ORDER_CONFIG: {
    readonly statuses: readonly ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"];
    readonly defaultTaxRate: 0.08;
    readonly defaultShippingRate: 10;
    readonly freeShippingThreshold: 100;
};
declare const UI_CONFIG: {
    readonly breakpoints: {
        readonly sm: "640px";
        readonly md: "768px";
        readonly lg: "1024px";
        readonly xl: "1280px";
        readonly '2xl': "1536px";
    };
    readonly animations: {
        readonly duration: {
            readonly fast: "150ms";
            readonly normal: "300ms";
            readonly slow: "500ms";
        };
        readonly easing: {
            readonly default: "cubic-bezier(0.4, 0, 0.2, 1)";
            readonly in: "cubic-bezier(0.4, 0, 1, 1)";
            readonly out: "cubic-bezier(0, 0, 0.2, 1)";
            readonly inOut: "cubic-bezier(0.4, 0, 0.2, 1)";
        };
    };
    readonly toast: {
        readonly duration: 4000;
        readonly position: "bottom-right";
    };
};
declare const FEATURES: {
    readonly enableReviews: true;
    readonly enableWishlist: true;
    readonly enableNewsletter: true;
    readonly enableAnalytics: true;
    readonly enableSEO: true;
    readonly enablePWA: false;
    readonly enablePayments: true;
    readonly enableSubscriptions: false;
};
declare const SEO_CONFIG: {
    readonly defaultTitle: "E-commerce MVP - Modern Online Store";
    readonly defaultDescription: "Discover amazing products at unbeatable prices. Fast shipping, easy returns, and excellent customer service.";
    readonly defaultImage: "/images/og-image.jpg";
    readonly titleTemplate: "%s | E-commerce MVP";
    readonly keywords: readonly ["ecommerce", "online store", "shopping", "products", "retail", "marketplace"];
};
declare const ERROR_MESSAGES: {
    readonly generic: "Something went wrong. Please try again.";
    readonly network: "Network error. Please check your connection.";
    readonly unauthorized: "You are not authorized to perform this action.";
    readonly notFound: "The requested resource was not found.";
    readonly validation: "Please check your input and try again.";
    readonly inventory: "Sorry, this item is out of stock.";
    readonly cart: {
        readonly addFailed: "Failed to add item to cart. Please try again.";
        readonly updateFailed: "Failed to update cart. Please try again.";
        readonly removeFailed: "Failed to remove item from cart. Please try again.";
        readonly emptyCart: "Your cart is empty.";
    };
    readonly checkout: {
        readonly failed: "Checkout failed. Please try again.";
        readonly paymentFailed: "Payment failed. Please try again.";
        readonly addressRequired: "Shipping address is required.";
    };
    readonly auth: {
        readonly signInFailed: "Sign in failed. Please check your credentials.";
        readonly signUpFailed: "Sign up failed. Please try again.";
        readonly unauthorized: "Please sign in to continue.";
    };
};
declare const SUCCESS_MESSAGES: {
    readonly cart: {
        readonly added: "Item added to cart successfully!";
        readonly updated: "Cart updated successfully!";
        readonly removed: "Item removed from cart.";
        readonly cleared: "Cart cleared successfully.";
    };
    readonly checkout: {
        readonly success: "Order placed successfully!";
        readonly paymentSuccess: "Payment processed successfully!";
    };
    readonly auth: {
        readonly signInSuccess: "Welcome back!";
        readonly signUpSuccess: "Account created successfully!";
        readonly signOutSuccess: "Signed out successfully.";
    };
    readonly general: {
        readonly saved: "Changes saved successfully!";
        readonly deleted: "Item deleted successfully.";
        readonly updated: "Item updated successfully.";
    };
};
declare const VALIDATION: {
    readonly email: {
        readonly pattern: RegExp;
        readonly message: "Please enter a valid email address.";
    };
    readonly password: {
        readonly minLength: 8;
        readonly pattern: RegExp;
        readonly message: "Password must be at least 8 characters with uppercase, lowercase, number, and special character.";
    };
    readonly phone: {
        readonly pattern: RegExp;
        readonly message: "Please enter a valid phone number.";
    };
    readonly postalCode: {
        readonly us: RegExp;
        readonly ca: RegExp;
        readonly message: "Please enter a valid postal code.";
    };
};
declare const SOCIAL_LINKS: {
    readonly twitter: "https://twitter.com/ecommercemvp";
    readonly facebook: "https://facebook.com/ecommercemvp";
    readonly instagram: "https://instagram.com/ecommercemvp";
    readonly linkedin: "https://linkedin.com/company/ecommercemvp";
    readonly youtube: "https://youtube.com/c/ecommercemvp";
};
declare const CONTACT_INFO: {
    readonly email: "hello@ecommercemvp.com";
    readonly phone: "+1 (555) 123-4567";
    readonly address: {
        readonly street: "123 Commerce St";
        readonly city: "San Francisco";
        readonly state: "CA";
        readonly postalCode: "94102";
        readonly country: "United States";
    };
    readonly hours: {
        readonly weekdays: "9:00 AM - 6:00 PM PST";
        readonly weekends: "10:00 AM - 4:00 PM PST";
    };
};

declare const getConfig: (key: string, defaultValue?: any) => any;
declare const isDevelopment: () => boolean;
declare const isProduction: () => boolean;
declare const isTest: () => boolean;

export { API_ENDPOINTS, APP_CONFIG, CART_CONFIG, CONTACT_INFO, ERROR_MESSAGES, FEATURES, ORDER_CONFIG, PAGINATION, PRODUCT_CONFIG, ROUTES, SEO_CONFIG, SOCIAL_LINKS, SUCCESS_MESSAGES, UI_CONFIG, VALIDATION, getConfig, isDevelopment, isProduction, isTest };
