const express = require('express');

const app = express();
const path = require('path'); 
const port = 3000;
require("./configs/database");

app.use(express.json());

app.use(express.static(path.join(__dirname, '..' , 'www')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  '..' ,'www', 'index.html'));
});

const itemRoutes = require('./routes/itemRoutes');
app.use('/', itemRoutes);

app.use(express.static('www'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});