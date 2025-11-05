
import React from 'react';
import type { Pallet } from '../types';
import { Package, DollarSign, Calendar, FileText, MoreVertical, Edit, Trash2, Eye, PlusCircle } from 'lucide-react';
import Spinner from './Spinner';

interface PalletListProps {
    pallets: Pallet[];
    onViewItems: (pallet: Pallet) => void;
    onEditPallet: (pallet: Pallet) => void;
    onDeletePallet: (id: string) => Promise<void>;
    onAddPallet: () => void;
    isLoading: boolean;
    error: string | null;
}

const PalletCard: React.FC<{ pallet: Pallet; onViewItems: (p: Pallet) => void; onEditPallet: (p: Pallet) => void; onDeletePallet: (id: string) => void; }> = ({ pallet, onViewItems, onEditPallet, onDeletePallet }) => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const totalCost = pallet.purchaseCost + pallet.shippingCost;

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden relative">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-amazon-blue mb-2 pr-8">{pallet.name}</h3>
                    <div className="relative">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-slate-500 hover:text-slate-700">
                            <MoreVertical size={20} />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border border-slate-200">
                                <button onClick={() => { onEditPallet(pallet); setMenuOpen(false); }} className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                    <Edit size={16} className="mr-2" /> Edit
                                </button>
                                <button onClick={() => { onDeletePallet(pallet._id); setMenuOpen(false); }} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                    <Trash2 size={16} className="mr-2" /> Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-sm text-slate-500 mb-4">{pallet.source || 'N/A'}</p>

                <div className="space-y-3 text-sm">
                    <div className="flex items-center text-slate-600"><DollarSign size={16} className="mr-2 text-green-500" />Total Cost: <span className="font-semibold ml-1">${totalCost.toFixed(2)}</span></div>
                    <div className="flex items-center text-slate-600"><Calendar size={16} className="mr-2 text-blue-500" />Purchased: <span className="font-semibold ml-1">{new Date(pallet.purchaseDate).toLocaleDateString()}</span></div>
                    <div className="flex items-center text-slate-600"><Package size={16} className="mr-2 text-yellow-500" />Items: <span className="font-semibold ml-1">{pallet.itemCount || 0}</span></div>
                    {pallet.notes && <div className="flex items-start text-slate-600 pt-2 border-t border-slate-100"><FileText size={16} className="mr-2 mt-0.5 text-slate-400" /><p className="text-xs italic">{pallet.notes}</p></div>}
                </div>
            </div>
             <button onClick={() => onViewItems(pallet)} className="w-full bg-slate-50 hover:bg-amazon-orange hover:text-white text-amazon-blue font-bold py-3 px-4 transition-colors duration-300 flex items-center justify-center text-sm">
                <Eye size={16} className="mr-2" /> View Items
            </button>
        </div>
    );
};


const PalletList: React.FC<PalletListProps> = ({ pallets, onViewItems, onEditPallet, onDeletePallet, onAddPallet, isLoading, error }) => {
    if (isLoading) return <div className="mt-8"><Spinner size="lg" /></div>;
    if (error) return <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-700">My Pallets</h2>
                <button
                    onClick={onAddPallet}
                    className="flex items-center bg-amazon-orange hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-opacity"
                >
                    <PlusCircle size={20} className="mr-2"/>
                    Add Pallet
                </button>
            </div>
            {pallets.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {pallets.map(pallet => (
                        <PalletCard key={pallet._id} pallet={pallet} onViewItems={onViewItems} onEditPallet={onEditPallet} onDeletePallet={onDeletePallet} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-700">No pallets yet!</h3>
                    <p className="text-slate-500 mt-2 mb-4">Click "Add Pallet" to get started.</p>
                </div>
            )}
        </div>
    );
};

export default PalletList;
