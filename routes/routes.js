const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

app.get(`/`, controller.getPokemonList);
app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/:pokemon`, controller.getSpecificPokemon);

module.exports = app;