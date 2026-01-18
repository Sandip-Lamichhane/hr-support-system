import React from 'react';
import { Users, Check, X, Calendar } from 'lucide-react';

const UserStats = ({ users }) => {
    const activeCount = users.filter(u => u.status?.toLowerCase() === 'active').length;
    const inactiveCount = users.filter(u => u.status?.toLowerCase() === 'inactive').length;
    const pendingCount = users.filter(u => u.status?.toLowerCase() === 'pending').length;

    const stats = [
        {
            label: 'Total Users',
            value: users.length,
            icon: Users,
            gradient: 'from-sky-400 to-blue-500',
        },
        {
            label: 'Active',
            value: activeCount,
            icon: Check,
            gradient: 'from-emerald-400 to-green-500',
        },
        {
            label: 'Inactive',
            value: inactiveCount,
            icon: X,
            gradient: 'from-gray-400 to-gray-500',
        },
        {
            label: 'Pending',
            value: pendingCount,
            icon: Calendar,
            gradient: 'from-amber-400 to-orange-500',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserStats;