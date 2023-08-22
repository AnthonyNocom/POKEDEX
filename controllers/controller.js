const axios = require('axios');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// change id to 3 digits format 1 => 001, 12 => 012, 123 => 123
function padID(id) {
    return String(id).padStart(3,'0');
}

// get flavor text using ID retrieved from getSpecificPokemon
async function getFlavorText(pokemonData) {
    try{
        flavorText = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/` + pokemonData.id)
            .then(res => res.data)
            .then(data => ({
                    flavorText: data.flavor_text_entries[0].flavor_text
                    })
                )
                return renderFlavorText(flavorText.flavorText);
            }
    catch (err) {
        console.error(err);
    }
}

function getTypesNormallyDamagedFrom(doubleDamageFrom, halfDamageFrom, noDamageFrom) {
    if (doubleDamageFrom.length) { // if doubleDamageFrom is null or empty
        const toRemove = new Set(doubleDamageFrom);
        difference = pokemonTypes.filter( x => !toRemove.has(x) );
    }
    if (halfDamageFrom.length) { // if doubleDamageFrom is null or empty
        const toRemove = new Set(halfDamageFrom);
        difference = difference.filter( x => !toRemove.has(x) );
    }
    if (noDamageFrom.length) { // if doubleDamageFrom is null or empty
        const toRemove = new Set(noDamageFrom);
        difference = difference.filter( x => !toRemove.has(x) );
    }
    return difference;
}

// get weaknesses using type retrieved from getSpecificPokemon
async function getWeaknesses(type) {
    try{
        weaknesses = await axios.get(`https://pokeapi.co/api/v2/type/` + type)
            .then(res => res.data)
            .then(data => ({
                    doubleDamageFrom: data.damage_relations.double_damage_from.map((type) => type.name),
                    halfDamageFrom: data.damage_relations.half_damage_from.map((type) => type.name),
                    noDamageFrom: data.damage_relations.no_damage_from.map((type) => type.name)
                    })
                )
                return weaknesses;
            }
    catch (err) {
        console.error(err);
    }
}

// for cleaning messy pokemon flavor text
function renderFlavorText(flavor_text) {
    html = flavor_text.replace('\f', '\n')
        .replace('\u00ad\n', '')
        .replace('\u00ad', '')
        .replace(' -\n', ' - ')
        .replace('-\n', '-')
        .replace('\n', ' ')

    return html;
}

pokemonTypes = ["normal",
                "fire",
                "water",
                "electric",
                "grass",
                "ice",
                "fighting",
                "poison",
                "ground",
                "flying",
                "psychic",
                "bug",
                "rock",
                "ghost",
                "steel",
                "dragon",
                "dark",
                "fairy"];

const controller =
{
    getFavicon: function (req, res) 
	{
        res.status(204);
    },

    // retrieve all pokemon data from API and pass it to homepage
    // unused, replaced by getInitialTen under "pokemon.js" script
    getPokemonList: async function (req, res) {
        // allPokemonData = [];
        // // Retrieve paginated list of pokemon from API (containing count, next, previous, and results[])
        // try {
        //     allPokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1010`) // get all 1010 pokemon
        //         .then(res => res.data.results)
        //         .then(data => (console.log(data))
        //         )
        // }
        // catch (err) {
        //     console.error(err);
        // }
        res.render('pokemonList');
    },

    // retrieve
    getSpecificPokemon: async function (req, res) {
        // retrieve pokemon name from front-end, use it to access API and retrieve a specific pokemon data
        pokemonName = req.path.slice(1); // Ex.: /bulbasaur = bulbasaur
        pokemonData = [];
        try{
            pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/` + pokemonName)
                .then(res => res.data)
                .then(data => ({
                        name: data.name,
                        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + padID(data.id) + ".png",
                        type: data.types.map((type) => capitalizeFirstLetter(type.type.name)), // can be array of 1 or 2 strings
                        id: data.id,
                        height: data.height/10, // convert to meters
                        weight: data.weight/10, // convert to kgs
                        abilities: data.abilities.map((poke) => capitalizeFirstLetter(poke.ability.name)), // can be array of 1 or 2 strings
                        stats: data.stats.map((poke) => capitalizeFirstLetter(poke.stat.name.concat(" ", poke.base_stat))), // 6 stats concatenated with their base values
                        })
                    )
                }
        catch (err) {
            console.error(err);
        }
        totalStats = 0;
        // get flavor text from API 
        pokemonData['flavorText'] = await getFlavorText(pokemonData);

        // get weaknesses from API
        pokemonData['weaknesses'] = await getWeaknesses(pokemonData.type[0].toLowerCase());
        pokemonData['weaknesses']['normallyDamagedFrom'] = getTypesNormallyDamagedFrom(pokemonData['weaknesses']['doubleDamageFrom'], pokemonData['weaknesses']['halfDamageFrom'], pokemonData['weaknesses']['noDamageFrom']);

        // get total stats from stats retrieved
        pokemonData['totalStats'] = pokemonData.stats.reduce((a, b) => a + b, 0); // concatenate stat strings
        pokemonData['totalStats'].match(/\d+/g) // get only the numbers from the concatenated string
                                 .forEach(function (stat) { totalStats+=parseInt(stat) }); // add all the numbers together and store in totalStats
        pokemonData['totalStats'] = totalStats;

        // pass all data
        res.render('specificPokemon', {pokemonData});
    },
}

module.exports = controller;