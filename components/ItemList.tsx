
import React from 'react';
import type { Pallet, Item } from '../types';
import { ItemStatus } from '../types';
import { ArrowLeft, Edit, PlusCircle, Trash2 } from 'lucide-react';
import Spinner from './Spinner';

interface ItemListProps {
    pallet: Pallet;
    items: Item[];
    onBack: () => void;
    onEditItem: (item: Item) => void;
    onDeleteItem: (id: string) => Promise<void>;
    onAddItem: () => void;
    isLoading: boolean;
    error: string | null;
}

const statusColors: Record<ItemStatus, string> = {
    [ItemStatus.UNLISTED]: 'bg-slate-200 text-slate-800',
    [ItemStatus.LISTED]: 'bg-blue-200 text-blue-800',
    [ItemStatus.SOLD]: 'bg-green-200 text-green-800',
};

const ItemList: React.FC<ItemListProps> = ({ pallet, items, onBack, onEditItem, onDeleteItem, onAddItem, isLoading, error }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
                <div>
                    <button onClick={onBack} className="flex items-center text-sm text-amazon-blue hover:underline mb-3">
                        <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
                    </button>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{pallet.name}</h1>
                    <p className="text-slate-500">{`Purchased on ${new Date(pallet.purchaseDate).toLocaleDateString()}`}</p>
                </div>
                <button
                    onClick={onAddItem}
                    className="flex mt-4 sm:mt-0 items-center bg-amazon-orange hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-opacity"
                >
                    <PlusCircle size={20} className="mr-2" />
                    Add Item
                </button>
            </div>

            {isLoading && <div className="mt-8"><Spinner size="lg" /></div>}
            {error && <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</div>}

            {!isLoading && !error && (
                <div className="overflow-x-auto">
                    {items.length > 0 ? (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 text-sm font-semibold text-slate-600">
                                    <th className="p-3">Product Name</th>
                                    <th className="p-3">Condition</th>
                                    <th className="p-3">Est. Value</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="p-3 font-medium text-slate-800">{item.productName}</td>
                                        <td className="p-3 text-slate-600">{item.condition}</td>
                                        <td className="p-3 text-slate-600">${item.estimatedValue.toFixed(2)}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[item.status]}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-3 text-right">
                                            <button onClick={() => onEditItem(item)} className="text-blue-600 hover:text-blue-800 p-1"><Edit size={18} /></button>
                                            <button onClick={() => onDeleteItem(item._id)} className="text-red-600 hover:text-red-800 p-1 ml-2"><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                         <div className="text-center py-12">
                            <h3 className="text-lg font-semibold text-slate-700">No items in this pallet yet.</h3>
                            <p className="text-slate-500 mt-2">Click "Add Item" to start processing.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ItemList;
