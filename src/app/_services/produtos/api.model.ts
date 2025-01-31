export class ApiProduct {
    id: number;
    name: string;
    description?: string;
    isActive: boolean;
    value?: number;
    productHistories: ApiProductHistory[];
    category: ApiProductCategory;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export class ApiProductHistory {
    id: number;
    availableUntil?: Date;
    value: number;
    product: ApiProduct;
    createdAt: Date;
    deletedAt?: Date;
}

export class ApiProductCategory {
    id: number;
    name: string;
    description?: string;
    products: ApiProduct[]
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}