
import type { Pallet, Item } from '../types';
import { ItemCondition, ItemStatus } from '../types';

// --- MOCK DATA ---
let mockPallets: Pallet[] = [
    {
        _id: 'p1',
        name: 'Electronics & Gadgets (May)',
        purchaseCost: 750,
        shippingCost: 150,
        purchaseDate: '2023-05-10T10:00:00Z',
        source: 'B-Stock',
        notes: 'Mostly customer returns. High potential value.'
    },
    {
        _id: 'p2',
        name: 'Home Goods & Decor',
        purchaseCost: 400,
        shippingCost: 120,
        purchaseDate: '2023-06-02T10:00:00Z',
        source: 'Liquidation.com',
        notes: ''
    },
];

let mockItems: Item[] = [
    // Pallet 1 Items
    { _id: 'i1', palletId: 'p1', productName: 'Echo Dot (4th Gen)', condition: ItemCondition.LIKE_NEW, estimatedValue: 35.00, status: ItemStatus.LISTED, asin: 'B07XJ8C8F7' },
    { _id: 'i2', palletId: 'p1', productName: 'Fire TV Stick 4K', condition: ItemCondition.VERY_GOOD, estimatedValue: 25.00, status: ItemStatus.SOLD, asin: 'B08XVYZ1Y5' },
    { _id: 'i3', palletId: 'p1', productName: 'Kindle Paperwhite', condition: ItemCondition.GOOD, estimatedValue: 80.00, status: ItemStatus.UNLISTED, asin: 'B08N36CVT2' },
    { _id: 'i4', palletId: 'p1', productName: 'Anker Power Bank', condition: ItemCondition.FOR_PARTS, estimatedValue: 5.00, status: ItemStatus.UNLISTED, asin: 'B0194WDVHI' },

    // Pallet 2 Items
    { _id: 'i5', palletId: 'p2', productName: 'Instant Pot Duo 7-in-1', condition: ItemCondition.VERY_GOOD, estimatedValue: 65.00, status: ItemStatus.LISTED, asin: 'B00FLYWNYQ' },
    { _id: 'i6', palletId: 'p2', productName: 'Keurig K-Classic Coffee Maker', condition: ItemCondition.GOOD, estimatedValue: 50.00, status: ItemStatus.UNLISTED, asin: 'B018UQ5AMS' },
];
// --- END MOCK DATA ---

const SIMULATED_DELAY = 500;

const delay = <T,>(data: T): Promise<T> => new Promise(resolve => setTimeout(() => resolve(data), SIMULATED_DELAY));

// --- PALLET API ---
export const getPallets = async (): Promise<Pallet[]> => {
    const palletsWithStats = mockPallets.map(p => {
        const palletItems = mockItems.filter(i => i.palletId === p._id);
        return {
            ...p,
            itemCount: palletItems.length,
            totalValue: palletItems.reduce((sum, item) => sum + item.estimatedValue, 0),
            soldCount: palletItems.filter(i => i.status === ItemStatus.SOLD).length
        }
    });
    return delay(palletsWithStats);
};

export const addPallet = async (data: Omit<Pallet, '_id'>): Promise<Pallet> => {
    const newPallet: Pallet = {
        ...data,
        _id: `p${Date.now()}`,
    };
    mockPallets.push(newPallet);
    return delay(newPallet);
};

export const updatePallet = async (id: string, data: Partial<Omit<Pallet, '_id'>>): Promise<Pallet> => {
    let palletToUpdate = mockPallets.find(p => p._id === id);
    if (!palletToUpdate) throw new Error('Pallet not found');
    Object.assign(palletToUpdate, data);
    return delay(palletToUpdate);
};

export const deletePallet = async (id: string): Promise<{ success: true }> => {
    mockPallets = mockPallets.filter(p => p._id !== id);
    // Also delete associated items
    mockItems = mockItems.filter(i => i.palletId !== id);
    return delay({ success: true });
};

// --- ITEM API ---
export const getItemsForPallet = async (palletId: string): Promise<Item[]> => {
    const items = mockItems.filter(item => item.palletId === palletId);
    return delay(items);
};

export const addItem = async (data: Omit<Item, '_id'>): Promise<Item> => {
    const newItem: Item = {
        ...data,
        _id: `i${Date.now()}`,
    };
    mockItems.push(newItem);
    return delay(newItem);
};

export const updateItem = async (id: string, data: Partial<Omit<Item, '_id'>>): Promise<Item> => {
    let itemToUpdate = mockItems.find(i => i._id === id);
    if (!itemToUpdate) throw new Error('Item not found');
    Object.assign(itemToUpdate, data);
    return delay(itemToUpdate);
};

export const deleteItem = async (id: string): Promise<{ success: true }> => {
    mockItems = mockItems.filter(i => i._id !== id);
    return delay({ success: true });
};
