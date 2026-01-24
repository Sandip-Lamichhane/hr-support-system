import React, { useState, useEffect } from 'react';
import { Plus, Edit2, X, Save, Loader } from 'lucide-react';
import { getCategories, createCategory, updateCategory, updateCategoryStatus } from './services/category.service';

export default function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [savingModal, setSavingModal] = useState(false);
    const itemsPerPage = 10;

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    // Fetch categories on component mount and when page changes
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);
                const offset = (currentPage - 1) * itemsPerPage;
                const data = await getCategories(offset, itemsPerPage);
                setCategories(data.categories || []);
                setTotalCount(data.total || 0);
            } catch (error) {
                setError(error.message || 'Failed to fetch categories');
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [currentPage, itemsPerPage]);

    const handleOpenCreate = () => {
        setEditingId(null);
        setFormData({ name: '', description: '' });
        setShowModal(true);
    };

    const handleOpenEdit = (category) => {
        setEditingId(category.id);
        setFormData({
            name: category.name,
            description: category.description
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.name.trim()) return;

        try {
            setSavingModal(true);
            setError(null);

            if (editingId) {
                await updateCategory(editingId, {
                    name: formData.name,
                    description: formData.description,
                });
            } else {
                await createCategory({
                    name: formData.name,
                    description: formData.description,
                });
            }

            setShowModal(false);
            setFormData({ name: '', description: '' });
            setCurrentPage(1);
        } catch (err) {
            setError(err.message || 'Failed to save category');
            console.error('Error saving category:', err);
        } finally {
            setSavingModal(false);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            setError(null);
            await updateCategoryStatus(id, {
                status: currentStatus === 'active' ? 'inactive' : 'active',
            });
            setCurrentPage(1);
        } catch (err) {
            setError(err.message || 'Failed to update category status');
            console.error('Error updating status:', err);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalCount);
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Support Categories</h1>
                    <p className="text-slate-600">Manage ticket categories for your HR support system</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                        {error}
                    </div>
                )}

                {/* Create Button & Count */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={handleOpenCreate}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        <Plus size={20} />
                        New Category
                    </button>

                    {!loading && totalCount > 0 && (
                        <p className="text-slate-600 text-sm font-medium">
                            Showing <span className="text-slate-900 font-semibold">{startIndex}</span> to{' '}
                            <span className="text-slate-900 font-semibold">{endIndex}</span> of{' '}
                            <span className="text-slate-900 font-semibold">{totalCount}</span>
                        </p>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="flex flex-col items-center gap-3">
                            <Loader size={32} className="text-blue-600 animate-spin" />
                            <p className="text-slate-600">Loading categories...</p>
                        </div>
                    </div>
                )}

                {/* Categories Grid */}
                {!loading && categories.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all overflow-hidden"
                            >
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
                                                <span
                                                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${category.status === 'active'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                >
                                                    {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 text-sm">{category.description}</p>
                                        </div>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="mb-4 pb-4 border-t border-slate-200 pt-4">
                                        <p className="text-xs text-slate-500">
                                            Created on{' '}
                                            {new Date(category.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenEdit(category)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium"
                                        >
                                            <Edit2 size={16} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => toggleStatus(category.id, category.status)}
                                            className={`flex-1 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${category.status === 'active'
                                                    ? 'border border-amber-300 text-amber-700 hover:bg-amber-50'
                                                    : 'border border-green-300 text-green-700 hover:bg-green-50'
                                                }`}
                                        >
                                            {category.status === 'active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && categories.length === 0 && totalCount === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-600 mb-4">No categories created yet</p>
                        <button
                            onClick={handleOpenCreate}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus size={20} />
                            Create First Category
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            Previous
                        </button>

                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-2 rounded-lg transition-colors font-medium ${currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-200">
                                <h2 className="text-xl font-semibold text-slate-900">
                                    {editingId ? 'Edit Category' : 'Create New Category'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    disabled={savingModal}
                                    className="text-slate-500 hover:text-slate-700 disabled:opacity-50"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-900 mb-2">
                                        Category Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g., Leave & Attendance"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        disabled={savingModal}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-900 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Add a brief description of this category..."
                                        rows="3"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        disabled={savingModal}
                                    />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex gap-3 p-6 border-t border-slate-200">
                                <button
                                    onClick={() => setShowModal(false)}
                                    disabled={savingModal}
                                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={!formData.name.trim() || savingModal}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-slate-400 disabled:cursor-not-allowed"
                                >
                                    {savingModal ? (
                                        <>
                                            <Loader size={16} className="animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={16} />
                                            Save
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}