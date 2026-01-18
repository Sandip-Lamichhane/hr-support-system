export const statusConfig = {
    open: { label: 'Open', color: 'bg-blue-100 text-blue-700' },
    'in-progress': { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700' },
    resolved: { label: 'Resolved', color: 'bg-green-100 text-green-700' },
    closed: { label: 'Closed', color: 'bg-gray-100 text-gray-700' },
};

export const priorityConfig = {
    critical: { label: 'Critical', color: 'bg-red-100 text-red-700' },
    high: { label: 'High', color: 'bg-orange-100 text-orange-700' },
    medium: { label: 'Medium', color: 'bg-blue-100 text-blue-700' },
    low: { label: 'Low', color: 'bg-gray-100 text-gray-700' },
};

export const initialFormData = {
    title: '',
    description: '',
    priority: 'medium',
    category_id: '',
    department_id: '',
    due_date: '',
    assigned_to: '',
};