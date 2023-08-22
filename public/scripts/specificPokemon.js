$(document).ready(function() {
    let currentPokemonID = $("#hiddenID").attr("value");

    // Function to update the URL based on the counter
    const updateUrl = async(id) => {
        url = window.location.origin + "/" + id;
        window.location.href = url;
    }

    $("#search").click(function() {
        let pokemonSearchName = $("#pokemonSearchName").val();
        console.log(pokemonSearchName);
        url = window.location.origin + "/" + pokemonSearchName;
        window.location.href = url;
    });
    
    $(".previous-button").click(function() {
        prevPokemonID = parseInt(currentPokemonID) - 1;
        updateUrl(prevPokemonID);
    });

    $(".next-button").click(function() {
        nextPokemonID = parseInt(currentPokemonID) + 1;
        updateUrl(nextPokemonID);
    });
})