$(document).ready(function() {
    limit = 10;
    pokemonData = new Set();
    let filterData = [];

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    $("#search").click(function() {
        console.log("HEHE");
    });

    $("#loadMore").click(function() {
        // load 10 more
        limit = limit + 10;
        console.log("Limit is now: ");
        console.log(limit);
        
    });

    $(document).on('click','.pokemonCard',function(){
        // go to detailed

    })
        

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
        pokemonData = [];

        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10`)
        .then((response) => response.json())
        .then((data) => {
            // retrieve all urls under results
            for(var i = 0; i < data.results.length; i++) {
                urls.push(data.results[i]['url']);
                promises.push(fetch(data.results[i]['url']).then((res) => res.json()));
            }
        }).catch((err) => {
            console.log("No results found", err);
        });
        //pokemonData.add(result);
        Promise.all(promises).then((results) => {
            pokemon3 = results.map((result) => (
                pokemonData.push({
                name: result.name,
                image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + padID(result.id) + ".png",
                type: result.types.map((type) => capitalizeFirstLetter(type.type.name)).join(', '),
                id: result.id
            })));
            console.log(pokemonData);
            displayPokemon2(pokemon3);
        });
    }

    const fetchPokemon = async (i) => {
        const promises = [];
        for (let i = 1; i <= 150; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            const req = await fetch(url);
            let pokemonList = [];
            const res = await req.json();

            for (var key in res) {
                if (myObject.hasOwnProperty(key)) {
                  myObject[key];
                }
              }

            const pokemon = res.map((result) => ({
                name: result.name,
                image: result.sprites['front_default'],
                type: result.types.map((type) => type.type.name).join(', '),
                id: result.id
            }));
            console.log(pokemon);
            vl.map((item) => pokemonList.push(res[item]));
            
            console.log(pokemonList);

            pokemonList.forEach(function (pokemonData) {
                const pokemon = pokemonData.map((result) => ({
                    name: result.name,
                    image: result.sprites['front_default'],
                    type: result.types.map((type) => type.type.name).join(', '),
                    id: result.id
                }));

                console.log(pokemon);
            });
            // console.log(loaded);
            // const pokemon = loaded.map((result) => ({
            //     name: result.name,
            //     image: result.sprites['front_default'],
            //     type: result.types.map((type) => type.type.name).join(', '),
            //     id: result.id
            // }));
            
            // console.log(pokemon);

            filterData.push(pokemonList);
            //promises.push(awaitfetch(url).then((res) => res.json()));
        }
        // Promise.all(promises).then((results) => {
        //     const pokemon = results.map((result) => ({
        //         name: result.name,
        //         image: result.sprites['front_default'],
        //         type: result.types.map((type) => type.type.name).join(', '),
        //         id: result.id
        //     }));
        //     displayPokemon(pokemon);
        // });
    };

    function storePokemonData (data) {
        data.forEach()
        return {
            name: data.name,
            image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + padID(data.id) + ".png",
            type: data.types.map((type) => capitalizeFirstLetter(type.type.name)).join(', '),
            id: data.id
        }
    }
    
    const displayPokemon = (pokemon) => {
        $("#pokedex").append(`
        <a href="/pokemonList/${pokemon.name}" style="text-decoration:none">
            <li class="pokemonCard" id="pokemon">
                <img class="pokemonImage" src="${pokemon.image}"/>
                <h2 class="pokemonName">${pokemon.id}. ${capitalizeFirstLetter(pokemon.name)}</h2>
                <p class="pokemonInfo">Type: ${pokemon.type}</p>
            </li>
        </a>
        `);
    };

    // Get the stats of 1 pokemon from the APIResults array of objects (containing name and url)
    const getStats = async (APIResults) => {
        try{
            const pokemonData = await axios.get(APIResults.url)
                .then(res => res.data)
                .then(data => (console.log(data),{
                        name: data.name,
                        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + padID(data.id) + ".png",
                        type: data.types.map((type) => capitalizeFirstLetter(type.type.name)), // can be array of 1 or 2 strings
                        id: data.id
                        
                        })
                        
                    )
                    console.log(pokemonData);
                    displayPokemon(pokemonData);
                    return pokemonData;
                }
        catch (err) {
            console.error(err);
        }
    };

    // Retrieve paginated list of pokemon from API (containing count, next, previous, and results[])
    const getPokemon2 = async () => {
        try{
            const initialTenPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10`)
                .then(res => res.data.results)
                .then(data => {
                    data.map(APIResults => {
                        getStats(APIResults);
                    });
                    return data; // ?
                })
        }
        catch (err) {
            console.error(err);
        }
    }
    
    getPokemon2();
})