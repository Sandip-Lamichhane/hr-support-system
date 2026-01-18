import React from 'react';

const FormField = ({ label, type, placeholder, value, onChange, rows }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        {type === 'textarea' ? (
            <textarea 
                value={value} 
                onChange={onChange} 
                rows={rows} 
                placeholder={placeholder} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
        ) : (
            <input 
                type={type} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
        )}
    </div>
);

export default FormField;