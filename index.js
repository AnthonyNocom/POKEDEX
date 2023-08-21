const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const routes = require(`./routes/routes.js`);
const fetch = require("node-fetch");

// View Engine Setup
app.set('views', path.join(__dirname));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(`public`));
app.use("/images", express.static(path.join(__dirname, "/public/images")));
hbs.registerPartials(__dirname + `/views/partials`);

hbs.registerHelper("padID", function(id) {
	return new hbs.SafeString(String(id).padStart(3,'0'));
});

hbs.registerHelper("capitalizeFirstLetter", function(string) {
	return new hbs.SafeString(string.charAt(0).toUpperCase() + string.slice(1));
});

hbs.registerHelper("func", function(options) {
	return options.fn({id:1});
});

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

app.use(`/`, routes);

app.listen(8080, function(error){
	if(error) throw error;
	console.log("Server created Successfully");
})