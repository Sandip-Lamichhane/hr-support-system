import React from 'react';

const StatCard = ({ label, value, bgColor }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-600 text-sm">{label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
            <div className={`w-12 h-12 ${bgColor} rounded-lg`}></div>
        </div>
    </div>
);

const TicketStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard label="Total Tickets" value={stats.total} bgColor="bg-blue-100" />
            <StatCard label="Open" value={stats.open} bgColor="bg-blue-100" />
            <StatCard label="In Progress" value={stats.inProgress} bgColor="bg-yellow-100" />
            <StatCard label="Resolved" value={stats.resolved} bgColor="bg-green-100" />
        </div>
    );
};

export default TicketStats;