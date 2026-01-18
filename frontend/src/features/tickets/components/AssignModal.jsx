import React from 'react';
import SelectField from './shared/SelectField';
import ModalHeader from './shared/ModalHeader';
import ModalFooter from './shared/ModalFooter';

const AssignModal = ({
    ticket,
    assignToId,
    setAssignToId,
    employees,
    loading,
    onSubmit,
    onClose
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
                <ModalHeader title="Assign Ticket" onClose={onClose} />

                <div className="p-6 space-y-4">
                    <SelectField
                        label="Assign To"
                        value={assignToId}
                        onChange={(e) => setAssignToId(e.target.value)}
                        options={[{ value: '', label: 'Select Employee' }, ...employees]}
                        optionKey="id"
                        optionLabel="name"
                        showRole={true}
                    />

                    {ticket && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Ticket</p>
                            <p className="font-semibold text-blue-600">{ticket.ticket_number}</p>
                            <p className="font-medium text-gray-900 mt-2">{ticket.title}</p>
                            <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
                        </div>
                    )}
                </div>

                <ModalFooter
                    loading={loading}
                    onSubmit={onSubmit}
                    onClose={onClose}
                    submitLabel="Assign Ticket"
                />
            </div>
        </div>
    );
};

export default AssignModal;