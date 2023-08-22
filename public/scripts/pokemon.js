$(document).ready(function() {
    limit = 10;
    offset = 0;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    $("#search").click(function() {
        let pokemonSearchName = $("#pokemonSearchName").val();
        console.log(pokemonSearchName);
        url = window.location.origin + "/" + pokemonSearchName;
        window.location.href = url;
    });

    $("#loadMore").click(function() {
        // load 10 more
        offset = offset + 10;
        loadMorePokemon(limit, offset)
    });

    $("#pokemonName").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#search").click();
        }
    });

    function padID(id) {
        return String(id).padStart(3,'0');
    }
    
    const displayPokemon = (pokemon) => {
        $("#pokedex").append(`
        <a href="/${pokemon.name}" style="text-decoration:none">
            <li class="pokemonCard" id="pokemon">
                <img class="pokemonImage" src="${pokemon.image}"/>
                <h2 class="pokemonName">
                    <span style="color:#4f4f4f;">#${padID(pokemon.id)}</b></span>
                    <br>
                    ${capitalizeFirstLetter(pokemon.name)}
                </h2>
                <p class="pokemonInfo">
                    <span class="type ${pokemon.type[0]}">${pokemon.type[0]}</span>
                    <span class="type ${pokemon.type[1] ? pokemon.type[1] : 'hidden'}">${pokemon.type[1]}</span>
                </p>
            </li>
        </a>
        `);
    };

    // Get the name and url of 1 pokemon from the APIResults array of objects (containing name and url)
    const getNameAndURL = async (APIResults) => {
        try{
            const pokemonData = await axios.get(APIResults.url)
                .then(res => res.data)
                .then(data => ({
                        name: data.name,
                        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + padID(data.id) + ".png",
                        type: data.types.map((type) => capitalizeFirstLetter(type.type.name)), // can be array of 1 or 2 strings
                        id: data.id
                        })
                    )
                    displayPokemon(pokemonData);
                    return pokemonData;
                }
        catch (err) {
            console.error(err);
        }
    };

    // Retrieve paginated list of pokemon from API (containing count, next, previous, and results[])
    const getInitialTen = async () => {
        try{
            const initialTenPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10`)
                .then(res => res.data.results)
                .then(data => {
                    data.map(APIResults => {
                        getNameAndURL(APIResults);
                    });
                })
        }
        catch (err) {
            console.error(err);
        }
    }
    
    const loadMorePokemon = async (limit, offset) => {
        try{
            const initialTenPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
                .then(res => res.data.results)
                .then(data => {
                    data.map(APIResults => {
                        getNameAndURL(APIResults);
                    });
                    return data; // ?
                })
        }
        catch (err) {
            console.error(err);
        }
    }

    getInitialTen();
})