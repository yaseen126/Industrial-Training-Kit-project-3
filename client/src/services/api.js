const API_BASE = '/api/items';

export const fetchItems = async (search = '', category = 'All') => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (category && category !== 'All') params.append('category', category);

  const url = `${API_BASE}?${params.toString()}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch items');
  return data;
};

export const createItem = async (itemData) => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create item');
  return data;
};

export const updateItem = async (id, itemData) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update item');
  return data;
};

export const deleteItem = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete item');
  return data;
};

export const seedDatabase = async () => {
  const res = await fetch(`${API_BASE}/seed`, {
    method: 'POST'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to seed database');
  return data;
};
