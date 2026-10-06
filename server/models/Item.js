const { db } = require('../config/db');

class ItemModel {
  static calculateStatus(quantity) {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 5) return 'Low Stock';
    return 'In Stock';
  }

  static async find(query = {}) {
    return await db.find(query).sort({ createdAt: -1 });
  }

  static async findById(id) {
    return await db.findOne({ _id: id });
  }

  static async create(data) {
    const { name, category, quantity, price } = data;

    if (!name || typeof name !== 'string' || !name.trim()) {
      throw new Error('Item name is required');
    }
    if (!category || typeof category !== 'string' || !category.trim()) {
      throw new Error('Category is required');
    }
    if (quantity === undefined || quantity === null || Number(quantity) < 0) {
      throw new Error('Quantity cannot be negative');
    }
    if (price === undefined || price === null || Number(price) < 0) {
      throw new Error('Price cannot be negative');
    }

    const trimmedName = name.trim();
    const existing = await db.findOne({ name: trimmedName });
    if (existing) {
      const err = new Error(`Duplicate value '${trimmedName}' entered for unique database constraint 'name'.`);
      err.code = 11000;
      throw err;
    }

    const numQty = Number(quantity);
    const numPrice = Number(price);
    const status = this.calculateStatus(numQty);
    const now = new Date().toISOString();

    const newItem = {
      name: trimmedName,
      category: category.trim(),
      quantity: numQty,
      price: numPrice,
      status,
      createdAt: now,
      updatedAt: now
    };

    return await db.insert(newItem);
  }

  static async findByIdAndUpdate(id, updateFields) {
    const existing = await db.findOne({ _id: id });
    if (!existing) return null;

    if (updateFields.quantity !== undefined && Number(updateFields.quantity) < 0) {
      throw new Error('Quantity cannot be negative');
    }
    if (updateFields.price !== undefined && Number(updateFields.price) < 0) {
      throw new Error('Price cannot be negative');
    }

    if (updateFields.name && updateFields.name.trim() !== existing.name) {
      const trimmedName = updateFields.name.trim();
      const duplicate = await db.findOne({ name: trimmedName });
      if (duplicate && duplicate._id !== id) {
        const err = new Error(`Duplicate value '${trimmedName}' entered for unique database constraint 'name'.`);
        err.code = 11000;
        throw err;
      }
      updateFields.name = trimmedName;
    }

    const newQty = updateFields.quantity !== undefined ? Number(updateFields.quantity) : existing.quantity;
    const newStatus = this.calculateStatus(newQty);

    const updatedData = {
      ...existing,
      ...updateFields,
      quantity: newQty,
      price: updateFields.price !== undefined ? Number(updateFields.price) : existing.price,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };

    await db.update({ _id: id }, updatedData);
    return updatedData;
  }

  static async findByIdAndDelete(id) {
    const existing = await db.findOne({ _id: id });
    if (!existing) return null;
    await db.remove({ _id: id }, {});
    return existing;
  }

  static async countDocuments() {
    return await db.count({});
  }
}

module.exports = ItemModel;
