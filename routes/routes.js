const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

app.get(`/products`, controller.getProducts);

module.exports = app;