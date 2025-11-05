
import { useState, useEffect, useCallback } from 'react';
import type { Item } from '../types';
import * as api from '../services/api';

export const useItems = (palletId: string | null | undefined) => {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = useCallback(async () => {
        if (!palletId) {
            setItems([]);
            return;
        }
        try {
            setIsLoading(true);
            setError(null);
            const data = await api.getItemsForPallet(palletId);
            setItems(data);
        } catch (err) {
            setError('Failed to fetch items for this pallet.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [palletId]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const addItem = async (itemData: Omit<Item, '_id'>) => {
        try {
            const newItem = await api.addItem(itemData);
            setItems(prev => [...prev, newItem]);
        } catch (err) {
            setError('Failed to add item.');
            console.error(err);
        }
    };

    const updateItem = async (id: string, itemData: Partial<Omit<Item, '_id'>>) => {
        try {
            const updatedItem = await api.updateItem(id, itemData);
            setItems(prev => prev.map(i => (i._id === id ? updatedItem : i)));
        } catch (err) {
            setError('Failed to update item.');
            console.error(err);
        }
    };

    const deleteItem = async (id: string) => {
        try {
            await api.deleteItem(id);
            setItems(prev => prev.filter(i => i._id !== id));
        } catch (err) {
            setError('Failed to delete item.');
            console.error(err);
        }
    };

    return { items, isLoading, error, addItem, updateItem, deleteItem, refetch: fetchItems };
};
