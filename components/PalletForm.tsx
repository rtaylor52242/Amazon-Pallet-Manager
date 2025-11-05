
import React, { useState, useEffect } from 'react';
import type { Pallet } from '../types';

type PalletFormData = Omit<Pallet, '_id' | 'purchaseDate'> & { purchaseDate: string };

interface PalletFormProps {
    pallet?: Pallet | null;
    onSubmit: (data: Omit<Pallet, '_id'>) => void;
    onCancel: () => void;
}

const PalletForm: React.FC<PalletFormProps> = ({ pallet, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<PalletFormData>({
        name: '',
        purchaseCost: 0,
        shippingCost: 0,
        purchaseDate: new Date().toISOString().split('T')[0],
        source: '',
        notes: '',
    });

    useEffect(() => {
        if (pallet) {
            setFormData({
                ...pallet,
                purchaseDate: new Date(pallet.purchaseDate).toISOString().split('T')[0],
            });
        } else {
             setFormData({
                name: '',
                purchaseCost: 0,
                shippingCost: 0,
                purchaseDate: new Date().toISOString().split('T')[0],
                source: '',
                notes: '',
            });
        }
    }, [pallet]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'purchaseCost' || name === 'shippingCost' ? parseFloat(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            purchaseDate: new Date(formData.purchaseDate).toISOString(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Pallet Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-amazon-blue focus:border-amazon-blue sm:text-sm" />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="purchaseCost" className="block text-sm font-medium text-slate-700">Purchase Cost ($)</label>
                    <input type="number" name="purchaseCost" id="purchaseCost" value={formData.purchaseCost} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-amazon-blue focus:border-amazon-blue sm:text-sm" />
                </div>
                 <div>
                    <label htmlFor="shippingCost" className="block text-sm font-medium text-slate-700">Shipping Cost ($)</label>
                    <input type="number" name="shippingCost" id="shippingCost" value={formData.shippingCost} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-amazon-blue focus:border-amazon-blue sm:text-sm" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="purchaseDate" className="block text-sm font-medium text-slate-700">Purchase Date</label>
                    <input type="date" name="purchaseDate" id="purchaseDate" value={formData.purchaseDate} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-amazon-blue focus:border-amazon-blue sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="source" className="block text-sm font-medium text-slate-700">Source (e.g., B-Stock)</label>
                    <input type="text" name="source" id="source" value={formData.source} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-amazon-blue focus:border-amazon-blue sm:text-sm" />
                </div>
            </div>
             <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
                <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-amazon-blue focus:border-amazon-blue sm:text-sm" />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="bg-white hover:bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg border border-slate-300">Cancel</button>
                <button type="submit" className="bg-amazon-orange hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg shadow-sm">{pallet ? 'Update Pallet' : 'Add Pallet'}</button>
            </div>
        </form>
    );
};

export default PalletForm;
