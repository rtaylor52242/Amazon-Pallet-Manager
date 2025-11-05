
export enum ItemCondition {
    LIKE_NEW = 'Like New',
    VERY_GOOD = 'Very Good',
    GOOD = 'Good',
    ACCEPTABLE = 'Acceptable',
    FOR_PARTS = 'For Parts',
}

export enum ItemStatus {
    UNLISTED = 'Unlisted',
    LISTED = 'Listed',
    SOLD = 'Sold',
}

export interface Item {
    _id: string;
    palletId: string;
    productName: string;
    asin?: string;
    upc?: string;
    condition: ItemCondition;
    costAllocated?: number;
    amazonPrice?: number;
    estimatedValue: number;
    status: ItemStatus;
}

export interface Pallet {
    _id: string;
    name: string;
    purchaseCost: number;
    shippingCost: number;
    purchaseDate: string;
    source?: string;
    notes?: string;
    itemCount?: number;
    totalValue?: number;
    soldCount?: number;
}
