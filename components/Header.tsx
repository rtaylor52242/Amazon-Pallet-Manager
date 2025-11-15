
import React from 'react';
import { PackageSearch, HelpCircle } from 'lucide-react';

interface HeaderProps {
    onHelpClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHelpClick }) => {
    return (
        <header className="bg-amazon-blue text-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <PackageSearch className="h-8 w-8 text-amazon-orange" />
                        <h1 className="text-xl font-bold tracking-wider">
                            Amazon Pallet Manager
                        </h1>
                    </div>
                    <div>
                        <button
                            onClick={onHelpClick}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Help"
                        >
                            <HelpCircle className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
