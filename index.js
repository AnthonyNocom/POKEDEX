const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const routes = require(`./routes/routes.js`);

// View Engine Setup
app.set('views', path.join(__dirname));
app.set('view engine', 'hbs');
app.use(express.static(`public`));
app.use("/images", express.static(path.join(__dirname, "/public/images")));
hbs.registerPartials(__dirname + `/views/partials`);

app.use(`/`, routes);

app.listen(8080, function(error){
	if(error) throw error;
	console.log("Server created Successfully");
})
