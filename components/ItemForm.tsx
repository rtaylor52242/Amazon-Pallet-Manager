
import React, { useState, useEffect } from 'react';
import type { Item } from '../types';
import { ItemCondition, ItemStatus } from '../types';
import { researchProduct } from '../services/geminiService';
import { Sparkles } from 'lucide-react';
import Spinner from './Spinner';

type ItemFormData = Omit<Item, '_id'>;

interface ItemFormProps {
    item?: Item | null;
    palletId: string;
    onSubmit: (data: Omit<Item, '_id'>) => void;
    onCancel: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ item, palletId, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<ItemFormData>({
        palletId: palletId,
        productName: '',
        condition: ItemCondition.GOOD,
        estimatedValue: 0,
        status: ItemStatus.UNLISTED,
        asin: '',
        upc: '',
        costAllocated: 0,
        amazonPrice: 0,
    });
    const [isResearching, setIsResearching] = useState(false);
    const [researchError, setResearchError] = useState<string | null>(null);

    useEffect(() => {
        if (item) {
            setFormData(item);
        } else {
            setFormData({
                palletId: palletId,
                productName: '',
                condition: ItemCondition.GOOD,
                estimatedValue: 0,
                status: ItemStatus.UNLISTED,
                asin: '',
                upc: '',
                costAllocated: 0,
                amazonPrice: 0,
            });
        }
    }, [item, palletId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'estimatedValue' || name === 'costAllocated' || name === 'amazonPrice' ? parseFloat(value) : value }));
    };

    const handleResearch = async () => {
        if (!formData.productName) {
            setResearchError('Please enter a product name first.');
            return;
        }
        setIsResearching(true);
        setResearchError(null);
        try {
            const result = await researchProduct(formData.productName);
            if(result) {
                setFormData(prev => ({
                    ...prev,
                    amazonPrice: result.estimatedPrice || prev.amazonPrice,
                    estimatedValue: result.estimatedPrice ? result.estimatedPrice * 0.7 : prev.estimatedValue, // default to 70% of amazon price
                    asin: result.suggestedAsin || prev.asin,
                }));
            }
        } catch (error) {
            setResearchError('Failed to research product. Please try again.');
            console.error(error);
        } finally {
            setIsResearching(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="productName" className="block text-sm font-medium text-slate-700">Product Name</label>
                <div className="flex items-center space-x-2 mt-1">
                    <input type="text" name="productName" id="productName" value={formData.productName} onChange={handleChange} required className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-amazon-blue focus:border-amazon-blue sm:text-sm" />
                    <button type="button" onClick={handleResearch} disabled={isResearching} className="flex items-center justify-center bg-amazon-blue hover:opacity-90 text-white font-bold py-2 px-3 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                        {isResearching ? <Spinner size="sm" /> : <Sparkles size={16} />}
                        <span className="ml-2 hidden sm:inline">AI Research</span>
                    </button>
                </div>
                {researchError && <p className="text-red-500 text-sm mt-1">{researchError}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="asin" className="block text-sm font-medium text-slate-700">ASIN</label>
                    <input type="text" name="asin" id="asin" value={formData.asin} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-amazon-blue focus:border-amazon-blue sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="amazonPrice" className="block text-sm font-medium text-slate-700">Amazon Price ($)</label>
                    <input type="number" step="0.01" name="amazonPrice" id="amazonPrice" value={formData.amazonPrice} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-amazon-blue focus:border-amazon-blue sm:text-sm" />
                </div>
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="estimatedValue" className="block text-sm font-medium text-slate-700">Estimated Resale Value ($)</label>
                    <input type="number" step="0.01" name="estimatedValue" id="estimatedValue" value={formData.estimatedValue} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-amazon-blue focus:border-amazon-blue sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-slate-700">Condition</label>
                    <select name="condition" id="condition" value={formData.condition} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-amazon-blue focus:border-amazon-blue sm:text-sm">
                        {Object.values(ItemCondition).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                <select name="status" id="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-amazon-blue focus:border-amazon-blue sm:text-sm">
                    {Object.values(ItemStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="bg-white hover:bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg border border-slate-300">Cancel</button>
                <button type="submit" className="bg-amazon-orange hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg shadow-sm">{item ? 'Update Item' : 'Add Item'}</button>
            </div>
        </form>
    );
};

export default ItemForm;
