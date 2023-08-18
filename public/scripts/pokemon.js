console.log("made it");

$(document).ready(function() {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function getPokemon() {
        console.log("we made it here");
        const name = document.querySelector("#pokemonName").value;
        const pokemonName = name.toLowerCase();
    
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("we fetched the pokemon");
            document.querySelector(".pokemonCard").innerHTML = `
            <div>
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${capitalizeFirstLetter(data.name)}"/>
            </div>
            <div class="pokemonInfo">
                <h1>${capitalizeFirstLetter(data.name)}</h1>
                <p>Weight: ${data.weight}</p>
            </div>
            `;
        }).catch((err) => {
            console.log("Pokemon not found", err);
        });
    }

    $("#search").click(function() {
        console.log("hello");
        getPokemon();
    });

    $("#pokemonName").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#search").click();
        }
    });
})