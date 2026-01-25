import React, { useState, useEffect } from 'react';
import {
    Search, Plus, Download, Edit, Trash2, X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { createDepartments, getDepartments } from '../settings/services/department.service'

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
        description: ''
    });

    // Fetch departments on mount
    useEffect(() => {
        fetchDepartments();
    }, []);

    // Fetch all departments
    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const res = await getDepartments();
            setDepartments(res.data);
        } catch (err) {
            console.error(err);
            setError('Failed to load departments.');
        } finally {
            setLoading(false);
        }
    };

    // Create a new department
    const storeDepartments = async () => {
        if (!formData.name.trim()) {
            return toast.error("Please fill in all fields");
        }

        try {
            setSubmitting(true);

            const payload = {
                name: formData.name,
                description: formData.description,
                status: 'Active', // default active
            };

            await createDepartments(payload);

            toast.success('Department created successfully!');
            closeModal();
            fetchDepartments(); // refresh list
        } catch (err) {
            console.error(err);
            toast.error('Failed to create department');
        } finally {
            setSubmitting(false);
        }
    };

    // // Delete department
    // const handleDelete = async (id, name) => {
    //     if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    //     try {
    //         await deleteDepartmentById(id);
    //         toast.success('Department deleted successfully');
    //         setDepartments(prev => prev.filter(d => d.id !== id));
    //     } catch (err) {
    //         console.error(err);
    //         toast.error('Failed to delete department');
    //     }
    // };

    // Search filter
    const filteredDepartments = departments.filter(d =>
        d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.description?.toLowerCase().includes(searchTerm.toLowerCase())
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

    const openAddModal = () => {
        setEditingDepartment(null);
        setFormData({ name: '', description: '' });
        setShowModal(true);
    };

    const closeModal = () => {
        if (submitting) return;
        setShowModal(false);
        setEditingDepartment(null);
        setFormData({ name: '', description: '' });
    };

    const exportDepartments = () => {
        const rows = [
            ['ID', 'Name', 'Description'],
            ...(selectedDepartments.length
                ? departments.filter(d => selectedDepartments.includes(d.id))
                : filteredDepartments
            ).map(d => [d.id, d.name, d.description])
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
    if (loading) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mb-4"></div>
                    <p className="text-gray-600">Loading departments...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto">
                    <div className="flex items-start gap-3">
                        <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Departments</h3>
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={fetchDepartments}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-bold">Departments</h1>
                <div className="flex gap-2">
                    <button
                        onClick={openAddModal}
                        className="px-4 bg-sky-500 text-white rounded-lg flex gap-2"
                    >
                        <Plus size={16} /> Add
                    </button>
                    <button
                        onClick={exportDepartments}
                        className="px-4 py-1 bg-gray-600 text-white rounded-lg"
                    >
                        <Download size={16} /> Export
                    </button>
                </div>
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
                                    onClick={() => {
                                        setEditingDepartment(d);
                                        setFormData({ name: d.name, description: d.description });
                                        setShowModal(true);
                                    }}
                                />
                                <Trash2
                                    className="cursor-pointer text-red-600"
                                    onClick={() => handleDelete(d.id, d.name)}
                                />
                            </div>
                        </div>
                        <h3 className="font-bold">{d.name}</h3>
                        <p className="text-sm text-gray-500">{d.description}</p>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <div className="flex justify-between mb-4">
                            <h2 className="font-bold">{editingDepartment ? 'Edit' : 'Add'} Department</h2>
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
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                        />

                        <button
                            onClick={storeDepartments}
                            className="w-full bg-sky-500 text-white py-2 rounded-lg"
                            disabled={submitting}
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
