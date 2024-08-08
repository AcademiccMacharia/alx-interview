#!/usr/bin/node

const request = require('request');
const util = require('util');

// Convert request to use promises
const requestPromise = util.promisify(request);

// Check if a movie ID is provided as a command-line argument
if (process.argv.length !== 3) {
  console.error('Usage: ./star_wars_characters.js <Movie ID>');
  process.exit(1);
}

const movieId = process.argv[2];
const url = `https://swapi.dev/api/films/${movieId}/`;

// Function to fetch data from a URL
async function fetchData(url) {
  try {
    const { body, statusCode } = await requestPromise(url);
    if (statusCode !== 200) {
      throw new Error(`Failed to retrieve data. Status code: ${statusCode}`);
    }
    return JSON.parse(body);
  } catch (error) {
    console.error('Error fetching data:', error);
    process.exit(1);
  }
}

// Main function to display character names
async function displayCharacterNames() {
  const filmData = await fetchData(url);
  
  if (!filmData.characters) {
    console.error('No characters found for the given movie ID.');
    process.exit(1);
  }

  // Fetch all character data and ensure order
  for (const characterUrl of filmData.characters) {
    try {
      const characterData = await fetchData(characterUrl);
      console.log(characterData.name);
    } catch (error) {
      console.error('Error fetching character data:', error);
    }
  }
}

// Execute the main function
displayCharacterNames();

