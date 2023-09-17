const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Get all items
router.get('/get_item', itemController.getAllItems);

// Get item by ID
router.get('/get_item_by_id', itemController.getItemById);

// Insert new item
router.post('/insert_item', itemController.insertItem);

// Update item by ID
router.post('/update_item', itemController.updateItemById);

module.exports = router;