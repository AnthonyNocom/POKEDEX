$(document).ready(function() {
    console.log("pokemon.js called");
    const pokedex = $("#pokedex")[0];

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    $("#search").click(function() {
        console.log("HEHE");
    });

    $("#pokemonName").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#search").click();
        }
    });

    function padID(id) {
        return String(id).padStart(3,'0');
    }
    
    function getPokemon() {
        //const name = $("#pokemonName").text().trim();
        //const pokemonName = name.toLowerCase();
        const urls = [];
        const promises = [];

        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10`)
        .then((response) => response.json())
        .then((data) => {
            // retrieve all urls under results
            for(var i = 0; i < data.results.length; i++) {
                urls.push(data.results[i]['url']);
                promises.push(fetch(data.results[i]['url']).then((res) => res.json()));
                Promise.all(promises).then((results) => {
                    const pokemon = results.map((result) => ({
                        name: result.name,
                        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + padID(result.id) + ".png",
                        type: result.types.map((type) => capitalizeFirstLetter(type.type.name)).join(', '),
                        id: result.id
                    }));
                    displayPokemon(pokemon);
                });
            }
        }).catch((err) => {
            console.log("No results found", err);
        });
    }
    
    const displayPokemon = (pokemon) => {
        pokemon.map((pokeman) => {
            //console.log(pokeman);
        });
        const pokemonHTMLString = pokemon.map((pokeman) => `
            <li class="pokemonCard">
                <img class="pokemonImage" src="${pokeman.image}"/>
                <h2 class="pokemonName">${pokeman.id}. ${capitalizeFirstLetter(pokeman.name)}</h2>
                <p class="pokemonInfo">Type: ${pokeman.type}</p>
            </li>
        `).join('');
        pokedex.innerHTML = pokemonHTMLString;
    };
    
    getPokemon();
    pokedex.innerHTML = "<li>hello</li>";
})