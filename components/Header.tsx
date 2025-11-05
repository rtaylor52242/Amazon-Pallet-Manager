
import React from 'react';
import { PackageSearch } from 'lucide-react';

const Header: React.FC = () => {
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
                </div>
            </div>
        </header>
    );
};

export default Header;
