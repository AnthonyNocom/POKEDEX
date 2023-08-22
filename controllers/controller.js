const controller =
{
    getPokemonList: function (req, res) {
        res.render('pokemonList');
    },

    getFavicon: function (req, res) 
	{
        res.status(204);
    },
    
}

module.exports = controller;