# POKEDEX
For a Technical Assessment by Old.St Labs (Internship Program)

The task is to: Create a POKEDEX - a simple catalog webpage where you can list and view
details of the Pokemon. (using pokeapi and javascript)

## Local Set Up
- Run `npm install`
- To run the application, execute `node index.js`

## Content
- [`controllers`](controllers) - This folder contains files that define callback functions for client requests.
- [`public`](public) - This folder contains static assets such as CSS, js, and image files.
- [`routes`](routes) - This folder contains files which describes the response of the server for each HTTP method request to a specific path in the server.
- [`views`](views) - This folder contains all hbs files to be rendered when requested from the server.
- [`index.js`](index.js) - The main entry point of the web application.

## Implemented Features
- Home Page (card view list of Pokemon)
    - Cards show Pokemon ID, name, image, and types
    - Cards can be searched
    - Cards redirect the user to a detailed Pokemon information page
    - 10 Pokemon are initially loaded, with 10 more that can be loaded through a "Load More" button.
 - Detailed Info Page (detailed information about Pokemon)
    - ID, name, image, types, height, weight, categories, stats
    - Weaknesses (derived from types)
    - Next and Previous Pokemon (go to next/previous Pokemon sorted by ID)

## Not Implemented Features
- Home Page
    - Cards filtering functionality
    - Cards sorting functionality

## Known Bugs and Issues
These are some of the known bugs and issues that were not fixed in time by August 22, 2023.

- Home Page
    - Card view list normally displays pokemon numerically, sorted by ID, but sometimes, it display pokemon in a random order.
- "Detailed Info Page"
    - Accessing the detailed info page of many specific pokemons at the same time causes the website to crash. This may be an issue in the implementation of async functions and in the retrieval of pokemon weaknesses.
    - Weaknesses are only derived from the primary type and not calculated by multiplying the weaknesses of the primary and secondary types.
- "Search Pokemon" functionality
    - Pressing enter after inputting the pokemon name or id does not allow searching. 
        - Cause: wrong element id retrieved in pokemon.js,
        - Cause: forgot a "keyup" event handler in specificPokemon.js, it is present in pokemon.js
    - No string handling in the search box means only lowercase and exact-match pokemon names work in searching.
        - Ex.: "bulbasaur" search works fine. "BuLBAsAuR" and "Bulbasaur" searches result in a crash.
    - No string handling for pokemon IDs
        - Ex.: "1" or "1010" searches work fine. "001" or "058" do not.
    - Search functionality redirects the user to the Detailed Info Page instead of displaying all pokemons in the homepage
        - Ex.: Searching for "dod" does not display doduo and dodrio in the homepage.