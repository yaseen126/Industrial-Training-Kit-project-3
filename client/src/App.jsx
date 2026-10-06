import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import FilterBar from './components/FilterBar';
import ItemTable from './components/ItemTable';
import ItemModal from './components/ItemModal';
import ConfirmModal from './components/ConfirmModal';
import Toast from './components/Toast';
import { fetchItems, createItem, updateItem, deleteItem, seedDatabase } from './services/api';

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  // Toast state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const categories = ['All', 'Electronics', 'Furniture', 'Office Supplies', 'Software', 'Hardware'];

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchItems(search, category);
      setItems(res.data || []);
    } catch (err) {
      showToast(err.message || 'Error connecting to database', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleCreateOrUpdate = async (formData) => {
    if (editingItem) {
      const res = await updateItem(editingItem._id, formData);
      showToast(res.message || 'Item updated successfully');
    } else {
      const res = await createItem(formData);
      showToast(res.message || 'Item created successfully');
    }
    loadItems();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    try {
      const res = await deleteItem(deletingItem._id);
      showToast(res.message || 'Item deleted successfully');
      setDeletingItem(null);
      loadItems();
    } catch (err) {
      showToast(err.message || 'Error deleting item', 'error');
    }
  };

  const handleSeed = async () => {
    try {
      const res = await seedDatabase();
      showToast(res.message || 'Database seeded successfully');
      loadItems();
    } catch (err) {
      showToast(err.message || 'Database already populated', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar
        onOpenAdd={() => {
          setEditingItem(null);
          setIsModalOpen(true);
        }}
        onSeed={handleSeed}
        itemCount={items.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <StatsCards items={items} />

        <FilterBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={categories}
          onRefresh={loadItems}
          loading={loading}
        />

        <ItemTable
          items={items}
          loading={loading}
          onEdit={(item) => {
            setEditingItem(item);
            setIsModalOpen(true);
          }}
          onDelete={(item) => setDeletingItem(item)}
        />
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-4 text-center text-xs text-slate-500">
        DecodeVault &copy; 2026 — Industrial Training Kit Project 3 (Database Integration & Persistence)
      </footer>

      {/* Modals */}
      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={editingItem}
      />

      <ConfirmModal
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
        item={deletingItem}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
}
