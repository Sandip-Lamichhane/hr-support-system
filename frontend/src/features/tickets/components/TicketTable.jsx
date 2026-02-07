import React from 'react';
import { statusConfig, priorityConfig } from '../constants/ticketConfig';

const TicketsTable = ({
    tickets,
    employees,
    categories,
    departments,
    onEdit,
    onAssign,
    onDelete,
}) => {
    const getEmployeeName = (employeeId) => {
        const employee = employees.find((e) => e.id === employeeId);
        return employee?.name || 'Unknown';
    };

    const getEmployeeInitials = (employeeId) => {
        const name = getEmployeeName(employeeId);
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    const getCategoryName = (categoryId) => {
        return categories.find((c) => c.id === categoryId)?.name || 'N/A';
    };

    const getDepartmentName = (departmentId) => {
        return departments.find((d) => d.id === departmentId)?.name || 'N/A';
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Ticket #</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Assigned To</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {tickets.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                                No tickets found
                            </td>
                        </tr>
                    ) : (
                        tickets.map((ticket) => (
                            <tr key={ticket.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <span className="font-semibold text-blue-600">{ticket.ticket_number}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-medium text-gray-900">{ticket.title}</p>
                                        <p className="text-sm text-gray-500 mt-1 truncate max-w-xs">{ticket.description}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig[ticket.status]?.color || 'bg-gray-100 text-gray-700'}`}>
                                        {statusConfig[ticket.status]?.label || ticket.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${priorityConfig[ticket.priority]?.color || 'bg-gray-100 text-gray-700'}`}>
                                        {priorityConfig[ticket.priority]?.label || ticket.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {ticket.assigned_to ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                                {getEmployeeInitials(ticket.assigned_to)}
                                            </div>
                                            <span className="text-sm text-gray-900">{getEmployeeName(ticket.assigned_to)}</span>
                                        </div>
                                    ) : (
                                        <button onClick={() => onAssign(ticket)} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                            Assign
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-600">{getDepartmentName(ticket.department_id)}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {ticket.due_date || 'N/A'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => onEdit(ticket)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => onDelete(ticket.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TicketsTable;