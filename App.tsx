
import React, { useState, useMemo } from 'react';
import type { Pallet, Item } from './types';
import { usePallets } from './hooks/usePallets';
import { useItems } from './hooks/useItems';
import Header from './components/Header';
import StatCard from './components/StatCard';
import PalletList from './components/PalletList';
import ItemList from './components/ItemList';
import Modal from './components/Modal';
import PalletForm from './components/PalletForm';
import ItemForm from './components/ItemForm';
import { Box, Package, DollarSign, CheckCircle } from 'lucide-react';

const App: React.FC = () => {
    const [view, setView] = useState<'dashboard' | 'items'>('dashboard');
    const [selectedPallet, setSelectedPallet] = useState<Pallet | null>(null);

    const { pallets, addPallet, updatePallet, deletePallet, isLoading: palletsLoading, error: palletsError } = usePallets();
    const { items, addItem, updateItem, deleteItem, isLoading: itemsLoading, error: itemsError } = useItems(selectedPallet?._id);

    const [isPalletModalOpen, setPalletModalOpen] = useState(false);
    const [isItemModalOpen, setItemModalOpen] = useState(false);
    const [editingPallet, setEditingPallet] = useState<Pallet | null>(null);
    const [editingItem, setEditingItem] = useState<Item | null>(null);

    const handleViewItems = (pallet: Pallet) => {
        setSelectedPallet(pallet);
        setView('items');
    };

    const handleBackToDashboard = () => {
        setSelectedPallet(null);
        setView('dashboard');
    };

    const handleOpenPalletModal = (pallet: Pallet | null = null) => {
        setEditingPallet(pallet);
        setPalletModalOpen(true);
    };

    const handleOpenItemModal = (item: Item | null = null) => {
        setEditingItem(item);
        setItemModalOpen(true);
    };

    const dashboardStats = useMemo(() => {
        const totalPalletCost = pallets.reduce((sum, p) => sum + p.purchaseCost + p.shippingCost, 0);
        const totalItems = pallets.reduce((sum, p) => sum + (p.itemCount || 0), 0);
        const totalListedValue = pallets.reduce((sum, p) => sum + (p.totalValue || 0), 0);
        const itemsSold = pallets.reduce((sum, p) => sum + (p.soldCount || 0), 0);

        return [
            { icon: Box, title: 'Total Pallets', value: pallets.length.toString(), color: 'text-blue-500' },
            { icon: DollarSign, title: 'Total Investment', value: `$${totalPalletCost.toFixed(2)}`, color: 'text-green-500' },
            { icon: Package, title: 'Total Items', value: totalItems.toString(), color: 'text-yellow-500' },
            { icon: CheckCircle, title: 'Items Sold', value: itemsSold.toString(), color: 'text-purple-500' },
        ];
    }, [pallets]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8">
                {view === 'dashboard' ? (
                    <>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Dashboard</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                            {dashboardStats.map(stat => (
                                <StatCard key={stat.title} icon={stat.icon} title={stat.title} value={stat.value} color={stat.color} />
                            ))}
                        </div>
                        <PalletList
                            pallets={pallets}
                            onViewItems={handleViewItems}
                            onEditPallet={handleOpenPalletModal}
                            onDeletePallet={deletePallet}
                            onAddPallet={() => handleOpenPalletModal(null)}
                            isLoading={palletsLoading}
                            error={palletsError}
                        />
                    </>
                ) : selectedPallet && (
                    <ItemList
                        pallet={selectedPallet}
                        items={items}
                        onBack={handleBackToDashboard}
                        onEditItem={handleOpenItemModal}
                        onDeleteItem={deleteItem}
                        onAddItem={() => handleOpenItemModal(null)}
                        isLoading={itemsLoading}
                        error={itemsError}
                    />
                )}
            </main>

            <Modal isOpen={isPalletModalOpen} onClose={() => setPalletModalOpen(false)} title={editingPallet ? 'Edit Pallet' : 'Add New Pallet'}>
                <PalletForm
                    pallet={editingPallet}
                    onSubmit={async (palletData) => {
                        if (editingPallet) {
                            await updatePallet(editingPallet._id, palletData);
                        } else {
                            await addPallet(palletData);
                        }
                        setPalletModalOpen(false);
                    }}
                    onCancel={() => setPalletModalOpen(false)}
                />
            </Modal>

            {selectedPallet && (
                 <Modal isOpen={isItemModalOpen} onClose={() => setItemModalOpen(false)} title={editingItem ? 'Edit Item' : 'Add New Item'}>
                    <ItemForm
                        item={editingItem}
                        palletId={selectedPallet._id}
                        onSubmit={async (itemData) => {
                            if (editingItem) {
                                await updateItem(editingItem._id, itemData);
                            } else {
                                await addItem(itemData);
                            }
                            setItemModalOpen(false);
                        }}
                        onCancel={() => setItemModalOpen(false)}
                    />
                </Modal>
            )}
        </div>
    );
};

export default App;
