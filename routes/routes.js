const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

app.get(`/pokemonList`, controller.getPokemonList);
app.get(`/favicon.ico`, controller.getFavicon);

module.exports = app;