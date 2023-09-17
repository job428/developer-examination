const Item = require('../models/itemModel');

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json({ status: '200', message: 'OK', data: items });
  } catch (err) {
    res.status(500).json({ status: 'error', message: ': '+err });
  }
};

// Get item by ID
exports.getItemById = async (req, res) => {
  const itemId = req.query._id;
  try {
    const item = await Item.findById(itemId);
    res.json({ status: '200', message: 'getItemById', data: item });
  } catch (err) {
    res.status(500).json({ status: 'error',  message: ': '+err });
  }
};

// Insert new item
exports.insertItem = async (req, res) => {
  console.log(req.body)
  const { name, price, quantity, description } = req.body;
  try {
    const newItem = new Item({ name, price, quantity, description });
    await newItem.save();
    res.json({ status: '200', message: 'insertItem' });
  } catch (err) {
    res.status(500).json({ status: 'error',  message: ': '+err});
  }
};

// Update item by ID
exports.updateItemById = async (req, res) => {
  console.log(req.body)
  const { id, name, price, quantity, description } = req.body;
  try {
    await Item.findByIdAndUpdate(id, { name, price, quantity, description });
    res.json({ status: '200', message: 'updateItemById' });
  } catch (err) {
    res.status(500).json({ status: 'error',  message: ': '+err });
  }
};