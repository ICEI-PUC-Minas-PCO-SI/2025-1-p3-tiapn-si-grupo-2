const express = require('express');
const cors = require('cors');

const fixwise = express();

// Middlewares
fixwise.use(cors());
fixwise.use(express.json());

module.exports = fixwise;