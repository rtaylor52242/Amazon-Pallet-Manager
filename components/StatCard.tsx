
import React from 'react';
import type { LucideProps } from 'lucide-react';

interface StatCardProps {
    icon: React.ComponentType<LucideProps>;
    title: string;
    value: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, color }) => {
    return (
        <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-slate-100 ${color}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
