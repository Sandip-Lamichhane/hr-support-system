export const EMPTY_FORM = {
    name: '',
    email: '',
    password: '',
    department_id: '',
    role: 'User',
    status: 'Active',
};

export const USER_ROLES = [
    { value: 'User', label: 'User' },
    { value: 'Admin', label: 'Admin' },
];

export const USER_STATUSES = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Pending', label: 'Pending' },
];

export const STATUS_FILTER_OPTIONS = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
];

export const getStatusColor = (status = '') => {
    switch (status.toLowerCase()) {
        case 'active': 
            return 'bg-emerald-100 text-emerald-700';
        case 'inactive': 
            return 'bg-gray-100 text-gray-700';
        case 'pending': 
            return 'bg-amber-100 text-amber-700';
        default: 
            return 'bg-gray-100 text-gray-700';
    }
};

export const getRoleColor = (role = '') => {
    switch (role.toLowerCase()) {
        case 'admin': 
            return 'bg-purple-100 text-purple-700';
        case 'user': 
            return 'bg-sky-100 text-sky-700';
        default: 
            return 'bg-gray-100 text-gray-700';
    }
};