const Item = require('../models/Item');

// @desc    Get all items with optional search & category filter (READ)
// @route   GET /api/items
const getItems = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    let items = await Item.find();

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      items = items.filter((item) => searchRegex.test(item.name));
    }

    if (category && category !== 'All') {
      items = items.filter((item) => item.category === category);
    }

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single item by ID (READ)
// @route   GET /api/items/:id
const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new item record (CREATE)
// @route   POST /api/items
const createItem = async (req, res, next) => {
  try {
    const { name, category, quantity, price } = req.body;

    const item = await Item.create({
      name,
      category,
      quantity,
      price
    });

    res.status(201).json({
      success: true,
      data: item,
      message: 'Item created successfully in database vault'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing item record (UPDATE)
// @route   PUT /api/items/:id
const updateItem = async (req, res, next) => {
  try {
    const { name, category, quantity, price } = req.body;

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (category !== undefined) updateFields.category = category;
    if (quantity !== undefined) updateFields.quantity = quantity;
    if (price !== undefined) updateFields.price = price;

    const item = await Item.findByIdAndUpdate(req.params.id, updateFields);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: item,
      message: 'Item updated successfully in database vault'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete item record (DELETE)
// @route   DELETE /api/items/:id
const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Item permanently deleted from database vault'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Seed sample data if DB is empty
// @route   POST /api/items/seed
const seedItems = async (req, res, next) => {
  try {
    const count = await Item.countDocuments();
    if (count > 0) {
      return res.status(400).json({
        success: false,
        message: 'Database already contains data'
      });
    }

    const sampleItems = [
      { name: 'Dell XPS 15 Laptop', category: 'Electronics', quantity: 12, price: 1499.99 },
      { name: 'Ergonomic Desk Chair', category: 'Furniture', quantity: 3, price: 249.50 },
      { name: 'Wireless Mechanical Keyboard', category: 'Electronics', quantity: 0, price: 89.99 },
      { name: '4K Ultra HD Monitor', category: 'Electronics', quantity: 8, price: 399.00 },
      { name: 'Standing Desk Converter', category: 'Furniture', quantity: 2, price: 179.99 }
    ];

    const createdItems = [];
    for (const sample of sampleItems) {
      const created = await Item.create(sample);
      createdItems.push(created);
    }

    res.status(201).json({
      success: true,
      count: createdItems.length,
      data: createdItems,
      message: 'Sample inventory seeded into database vault'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  seedItems
};
