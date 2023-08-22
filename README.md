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
