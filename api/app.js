const express = require('express');

const app = express();
const path = require('path'); 
const port = 3000;
require("./configs/database");



// Other middleware and routes
app.use(express.json());

// Serve the static files from the 'www' directory
app.use(express.static(path.join(__dirname, '..' , 'www')));

// Define a route handler for the root URL ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  '..' ,'www', 'index.html'));
});

// Require and use your route files here
const itemRoutes = require('./routes/itemRoutes');
app.use('/', itemRoutes);

app.use(express.static('www'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});