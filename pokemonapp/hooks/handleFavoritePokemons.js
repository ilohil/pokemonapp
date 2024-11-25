import { useState, useEffect } from "react";
import { updateFavorites, deleteFavorite, saveFavorite } from "../utils/SQLite";

export function handleFavoritepokemons() {

    const [favoritePokemons, setFavoritePokemons] = useState([]);

    //Päivitetään suosikkipokemonit
    const updateFavoritePokemons = async () => {
        try {
            const favorites = await updateFavorites();
            setFavoritePokemons(favorites);
        } catch (error) {
            console.log("Couldn't fetch favorite pokemons: ", error)
        }

        console.log(favoritePokemons);
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

        } catch (error) {
            console.log("Couldn't update favorite pokemon id: ", pokemonId, error)
        }

    }

    //Ladataan suosikki kun hook renderöidään
    useEffect(() => { updateFavoritePokemons() }, []);

    // Palautetaan suosikkipokemonit ja funktio
    return { favoritePokemons, toggleFavoritePokemon };
}