import { useState, useEffect} from "react";
import { updateFavorites, deleteFavorite, saveFavorite } from "../utils/SQLite";


export function handleFavoritepokemons() {

    const [favoritePokemons, setFavoritePokemons] = useState([]);

    //Päivitetään suosikkipokemonit
    const updateFavoritePokemons = async () => {
        try {
            const favorites = await updateFavorites();
            setFavoritePokemons(favorites);
            console.log(favoritePokemons)
        } catch (error) {
            console.error('Error updating favorite Pokemons:', error);
        }
    }

    // Poistetaan Pokemon suosikeista tai lisätään suosikkeihin
    const toggleFavoritePokemon = async (pokemonId) => {

        try {
            if (favoritePokemons.some(fav => fav.pokemonId === pokemonId)) {
                await deleteFavorite(pokemonId);
            } else {
                await saveFavorite(pokemonId);
            }
            await updateFavoritePokemons();
            console.log(favoritePokemons)
        } catch (error) {
            console.log("Couldn't update favorite pokemon id: ", pokemonId, error)
        }
    }

    //Ladataan suosikit uudelleen kun sivu renderöidään
    useEffect(() => {
        updateFavoritePokemons();
      }, []);

    // Palautetaan suosikkipokemonit ja funktio
    return { favoritePokemons, toggleFavoritePokemon };
}