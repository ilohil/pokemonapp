import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('favoritedb')

// Luodaan taulu suosikkipokemoneille
export const initialize = async () => {
    try {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY NOT NULL, pokemonId INT);`);
      } catch (error) {
        console.error('Could not open database', error);
      }
}

// Funktio jolla voi lisätä suosikkipokemonin
export const saveFavorite = async (pokemonId) => {
    try {
        await db.runAsync('INSERT INTO favorites (pokemonId) VALUES (?)', pokemonId);
        console.log('Favorite added with id: ', pokemonId)
        await updateFavorites();
    } catch (error) {
        console.error('Could not add favorite Pokemon', error);
    }

}

// Funktio jolla voi hakea kaikki suosikkipokemonit
export const updateFavorites = async () => {
    try {
        const favorites = await db.getAllAsync('SELECT * from favorites');
        return favorites;
    } catch (error) {
        console.error('Could not get favorite Pokemons', error);
    }
}

// Funktio jolla voi poistaa Pokemonin suosikeista
export const deleteFavorite = async (pokemonId) => {
    try {
        await db.runAsync('DELETE FROM favorites where pokemonId=?', pokemonId);
        console.log('Favorite deleted with id: ', pokemonId)
        await updateFavorites();
    } catch (error) {
        console.error('Could not delete Pokemon from favorites', error);
    }
}