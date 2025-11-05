
import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };
    return (
        <div className="flex justify-center items-center">
            <Loader2 className={`animate-spin text-amazon-blue ${sizeClasses[size]}`} />
        </div>
    );
};

export default Spinner;
