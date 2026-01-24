import React from 'react';
import FormField from './shared/FormField';
import SelectField from './shared/SelectField';
import FileUploadField from './shared/FileUploadField';
import ModalHeader from './shared/ModalHeader';
import ModalFooter from './shared/ModalFooter';

const TicketFormModal = ({
    title,
    formData,
    setFormData,
    categories,
    departments,
    employees,
    loading,
    selectedTicket,
    onSubmit,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <ModalHeader title={title} onClose={onClose} />

                <div className="p-6 space-y-4">
                    <FormField
                        label="Title *"
                        type="text"
                        placeholder="Enter ticket title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />

                    <FormField
                        label="Description *"
                        type="textarea"
                        placeholder="Describe the issue or request"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <SelectField
                            label="Priority"
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            options={[
                                { value: 'low', label: 'Low' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'high', label: 'High' },
                                { value: 'critical', label: 'Critical' },
                            ]}
                        />

                        <SelectField
                            label="Category"
                            value={formData.category_id}
                            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                            options={[{ value: '', label: 'Select Category' }, ...categories]}
                            optionKey="id"
                            optionLabel="name"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <SelectField
                            label="Department"
                            value={formData.department_id}
                            onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                            options={[{ value: '', label: 'Select Department' }, ...departments]}
                            optionKey="id"
                            optionLabel="name"
                            disableEmptyOption
                        />

                        <FormField
                            label="Due Date"
                            type="date"
                            value={formData.due_date}
                            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                        />
                    </div>

                    <SelectField
                        label="Assign To"
                        value={formData.assigned_to}
                        onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                        options={[{ value: '', label: 'Unassigned' }, ...employees]}
                        optionKey="id"
                        optionLabel="name"
                        disableEmptyOption
                    />

                    <FileUploadField
                        label="Attachments"
                        files={formData.files || []}
                        onChange={(files) => setFormData({ ...formData, files })}
                    />

                    {selectedTicket && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Ticket Number</p>
                            <p className="font-semibold text-blue-600">{selectedTicket.ticket_number}</p>
                        </div>
                    )}
                </div>

                <ModalFooter
                    loading={loading}
                    onSubmit={onSubmit}
                    onClose={onClose}
                    submitLabel={selectedTicket ? 'Update Ticket' : 'Create Ticket'}
                />
            </div>
        </div>
    );
};

export default TicketFormModal;