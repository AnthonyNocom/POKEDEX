var fs = require('fs');
// https://pokeapi.co/api/v2/ability/{id or name}/

const controller =
{
    getProducts: function (req, res) {
        var sortby = req.query.sortby; // undefined
        //console.log(sortby);
        // sort by id or name
        // if (sortby === "Alphabetical") {
        //     // get data from api
        //     var files = fs.readdirSync('public/sample_images/');
        //     console.log(files);
        //     var details = {};
        //     details.products = arrayOfResult.sort(compare);
        //     details.sort = "name";
        //     console.log(arrayOfResult);
        //     res.render('products', { details });
        // }
        var files = fs.readdirSync('public/images/');

        //var details = {};
        var details = {
            products: [
                {
                    itemName: 'onion',
                    imageURL: 'onion.png',
                    price: 100
                },
                {
                    itemName: 'strawberry',
                    imageURL: 'strawberry.png',
                    price: 200
                },
                {
                    itemName: 'tomato',
                    imageURL: 'tomato.png',
                    price: 300
                }
            ],
        };
        details.sort = "HELLO";

        //console.log(details);

        res.render('products', { details });
    }
}

module.exports = controller;