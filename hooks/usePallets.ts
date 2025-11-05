
import { useState, useEffect, useCallback } from 'react';
import type { Pallet } from '../types';
import * as api from '../services/api';

export const usePallets = () => {
    const [pallets, setPallets] = useState<Pallet[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPallets = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await api.getPallets();
            setPallets(data);
        } catch (err) {
            setError('Failed to fetch pallets.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPallets();
    }, [fetchPallets]);

    const addPallet = async (palletData: Omit<Pallet, '_id'>) => {
        try {
            const newPallet = await api.addPallet(palletData);
            setPallets(prev => [...prev, newPallet]);
        } catch (err) {
            setError('Failed to add pallet.');
            console.error(err);
        }
    };

    const updatePallet = async (id: string, palletData: Partial<Omit<Pallet, '_id'>>) => {
        try {
            const updatedPallet = await api.updatePallet(id, palletData);
            setPallets(prev => prev.map(p => (p._id === id ? updatedPallet : p)));
        } catch (err) {
            setError('Failed to update pallet.');
            console.error(err);
        }
    };

    const deletePallet = async (id: string) => {
        try {
            await api.deletePallet(id);
            setPallets(prev => prev.filter(p => p._id !== id));
        } catch (err) {
            setError('Failed to delete pallet.');
            console.error(err);
        }
    };

    return { pallets, isLoading, error, addPallet, updatePallet, deletePallet, refetch: fetchPallets };
};
