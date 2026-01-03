import React, { useState, useEffect } from 'react';
import {
    Search, Plus, Download, Edit, Trash2,
    Building2, Users, Briefcase, AlertCircle, X, Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        details: ''
    });


    // const createDepartment = async () => {
    //     setSubmitting(true);
    //     try {
    //         const res = await fetch('/api/departments', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(formData),
    //         });

    //         if (!res.ok) throw new Error('Failed to create department');

    //         toast.success(`Department "${formData.name}" created`);
    //         closeModal();
    //         fetchDepartments();
    //     } catch (err) {
    //         toast.error(err.message);
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };

    // const updateDepartment = async () => {
    //     setSubmitting(true);
    //     try {
    //         const res = await fetch(`/api/departments/${editingDepartment.id}`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(formData),
    //         });

    //         if (!res.ok) throw new Error('Failed to update department');

    //         toast.success(`Department updated`);
    //         closeModal();
    //         fetchDepartments();
    //     } catch (err) {
    //         toast.error(err.message);
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };

    // const deleteDepartment = async (id, name) => {
    //     if (!confirm(`Delete "${name}"?`)) return;

    //     try {
    //         const res = await fetch(`/api/departments/${id}`, { method: 'DELETE' });
    //         if (!res.ok) throw new Error('Delete failed');

    //         toast.success(`"${name}" deleted`);
    //         fetchDepartments();
    //     } catch (err) {
    //         toast.error(err.message);
    //     }
    // };

    /* =======================
       HELPERS
    ======================= */
    const filteredDepartments = departments.filter(d =>
        d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.details?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleDepartmentSelection = (id) => {
        setSelectedDepartments(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) return toast.error('Department name required');
        if (!formData.details.trim()) return toast.error('Department details required');
        return true;
    };

    const openAddModal = () => {
        setEditingDepartment(null);
        setFormData({ name: '', details: '' });
        setShowModal(true);
    };

    const openEditModal = (dept) => {
        setEditingDepartment(dept);
        setFormData({ name: dept.name, details: dept.details });
        setShowModal(true);
    };

    const closeModal = () => {
        if (submitting) return;
        setShowModal(false);
        setEditingDepartment(null);
        setFormData({ name: '', details: '' });
    };

    const exportDepartments = () => {
        const rows = [
            ['ID', 'Name', 'Details', 'Employees'],
            ...(selectedDepartments.length
                ? departments.filter(d => selectedDepartments.includes(d.id))
                : filteredDepartments
            ).map(d => [
                `"${d.id}"`,
                `"${d.name}"`,
                `"${d.details}"`,
                d.employeeCount ?? 0
            ])
        ];

        const csv = rows.map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'departments.csv';
        a.click();

        toast.success('Exported successfully');
    };

    /* =======================
       UI
    ======================= */
    if (loading) return <div className="p-8 text-center">Loading...</div>;

    if (error) {
        return (
            <div className="p-8 text-center text-red-600">
                <AlertCircle className="mx-auto mb-2" />
                {error}
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-bold">Departments</h1>
                <button
                    onClick={openAddModal}
                    className="px-4 py-2 bg-sky-500 text-white rounded-lg flex gap-2"
                >
                    <Plus size={16} /> Add
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                    className="pl-10 pr-4 py-2 border rounded-lg w-full"
                    placeholder="Search departments..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                {filteredDepartments.map(d => (
                    <div key={d.id} className="bg-white p-5 rounded-xl border">
                        <div className="flex justify-between mb-3">
                            <input
                                type="checkbox"
                                checked={selectedDepartments.includes(d.id)}
                                onChange={() => toggleDepartmentSelection(d.id)}
                            />
                            <div className="flex gap-2">
                                <Edit
                                    className="cursor-pointer text-sky-600"
                                    onClick={() => openEditModal(d)}
                                />
                                <Trash2
                                    className="cursor-pointer text-red-600"
                                    onClick={() => deleteDepartment(d.id, d.name)}
                                />
                            </div>
                        </div>
                        <h3 className="font-bold">{d.name}</h3>
                        <p className="text-sm text-gray-500">{d.details}</p>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <div className="flex justify-between mb-4">
                            <h2 className="font-bold">
                                {editingDepartment ? 'Edit' : 'Add'} Department
                            </h2>
                            <X onClick={closeModal} className="cursor-pointer" />
                        </div>

                        <input
                            className="w-full mb-3 p-2 border rounded"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Department name"
                        />
                        <textarea
                            className="w-full mb-4 p-2 border rounded"
                            name="details"
                            value={formData.details}
                            onChange={handleInputChange}
                            placeholder="Details"
                        />

                        <button
                            disabled={submitting}
                            onClick={() => {
                                if (!validateForm()) return;
                                editingDepartment ? updateDepartment() : createDepartment();
                            }}
                            className="w-full bg-sky-500 text-white py-2 rounded-lg"
                        >
                            {submitting ? 'Processing...' : 'Save'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Department;