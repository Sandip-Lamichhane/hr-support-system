import React from 'react';

const ModalFooter = ({ loading, onSubmit, onClose, submitLabel = 'Submit' }) => (
    <div className="flex justify-end gap-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
        <button 
            onClick={onClose} 
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
            Cancel
        </button>
        <button 
            onClick={onSubmit} 
            disabled={loading} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
        >
            {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            {submitLabel}
        </button>
    </div>
);

export default ModalFooter;