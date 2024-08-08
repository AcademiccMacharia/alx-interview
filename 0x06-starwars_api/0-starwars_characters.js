#!/usr/bin/node

const request = require('request');
const { promisify } = require('util');

// Promisify the request module to use async/await
const requestAsync = promisify(request);

async function fetchFilmData(url) {
  try {
    const response = await requestAsync(url);
    const filmData = JSON.parse(response.body);
    return filmData.characters;
  } catch (error) {
    console.error('Error fetching film data:', error);
    process.exit(1);
  }
}

async function fetchCharacterData(url) {
  try {
    const response = await requestAsync(url);
    const characterData = JSON.parse(response.body);
    return characterData.name;
  } catch (error) {
    console.error('Error fetching character data:', error);
    return null;
  }
}

async function main() {
  // Ensure a movie ID is provided
  if (process.argv.length !== 3) {
    console.log('Usage: ./star_wars_characters.js <movie_id>');
    process.exit(1);
  }

  // Parse the movie ID from command line arguments
  const movieId = process.argv[2];

  // URL for the films endpoint of the Star Wars API
  const filmUrl = `https://swapi.dev/api/films/${movieId}/`;

  // Fetch the film data
  const characterUrls = await fetchFilmData(filmUrl);

  // Fetch character data and print names in order
  for (const characterUrl of characterUrls) {
    const characterName = await fetchCharacterData(characterUrl);
    if (characterName) {
      console.log(characterName);
    }
  }
}

main();

