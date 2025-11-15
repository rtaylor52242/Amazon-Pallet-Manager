
import React from 'react';
import Modal from './Modal';
import { Box, Package, Sparkles } from 'lucide-react';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HelpSection: React.FC<{ icon: React.ElementType, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="mb-6">
        <div className="flex items-center mb-2">
            <Icon className="h-6 w-6 mr-3 text-amazon-blue" />
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
        <div className="pl-9 text-slate-600 space-y-2 text-sm">
            {children}
        </div>
    </div>
);

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="How to Use the App">
            <div className="text-slate-700">
                <p className="mb-6 text-sm">
                    Welcome to the Amazon Pallet Manager! This guide will help you get started with tracking your pallets, managing inventory, and discovering product value.
                </p>

                <HelpSection icon={Box} title="Managing Pallets">
                    <p>The main dashboard displays all your pallets. A pallet is a collection of items you've purchased.</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>Add a Pallet:</strong> Click the "Add Pallet" button on the dashboard to open a form where you can enter details like name, cost, and purchase date.</li>
                        <li><strong>View Items:</strong> Click the "View Items" button on any pallet card to see the list of items inside it.</li>
                        <li><strong>Edit/Delete:</strong> Use the three-dot menu on a pallet card to edit its details or delete it permanently.</li>
                    </ul>
                </HelpSection>

                <HelpSection icon={Package} title="Managing Items">
                    <p>Inside a pallet, you can manage individual items. This is where you process your inventory.</p>
                     <ul className="list-disc list-inside space-y-1">
                        <li><strong>Add an Item:</strong> Once you're viewing a pallet, click "Add Item" to log a new product.</li>
                        <li><strong>Track Details:</strong> For each item, you can record its name, condition, estimated value, and selling status (Unlisted, Listed, Sold).</li>
                        <li><strong>Edit/Delete:</strong> Use the action buttons in the item list to edit or delete an item.</li>
                    </ul>
                </HelpSection>

                <HelpSection icon={Sparkles} title="AI-Powered Research">
                    <p>The "AI Research" feature helps you quickly find information about your products.</p>
                     <ul className="list-disc list-inside space-y-1">
                        <li>When adding or editing an item, type its name in the "Product Name" field.</li>
                        <li>Click the ✨ "AI Research" button.</li>
                        <li>The app will use AI to suggest a potential Amazon selling price and ASIN (Amazon Standard Identification Number), saving you time on manual research.</li>
                    </ul>
                </HelpSection>
            </div>
        </Modal>
    );
};

export default HelpModal;
