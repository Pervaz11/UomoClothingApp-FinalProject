export const Endpoints = {
    products: "/products",
    accessory: "/accessory",
    partners: "/partners",
    auth: "/auth",
} as const;

export type Endpoints = typeof Endpoints[keyof typeof Endpoints];
