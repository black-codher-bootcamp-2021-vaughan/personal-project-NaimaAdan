const express = require('express');

// Set up express server
const app = express();

// Set static folder
app.use(express.static('public'))

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));