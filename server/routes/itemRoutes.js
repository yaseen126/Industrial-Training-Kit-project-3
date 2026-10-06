const express = require('express');
const router = express.Router();
const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  seedItems
} = require('../controllers/itemController');

// Seed route for sample data initialization
router.post('/seed', seedItems);

// CRUD routes
router.route('/')
  .get(getItems)       // READ (all items, supports ?search= & ?category=)
  .post(createItem);   // CREATE (new item)

router.route('/:id')
  .get(getItemById)    // READ (single item by ID)
  .put(updateItem)     // UPDATE (item by ID)
  .delete(deleteItem); // DELETE (item by ID)

module.exports = router;
