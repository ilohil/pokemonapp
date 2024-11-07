export const fetchPokemons = async () => {

    try {

        //Noudetaan 151 alkuperäistä Pokemonia
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
        const data = await response.json();

        //Loopataan 151 Pokemonin lista läpi, jotta saadaan tarkemmat tiedot Pokemoneista
        const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon) => {

                // Noudetaan tiedot responsessa olevasta Pokemonin urlista
                const pokemonResponse = await fetch(pokemon.url);
                const pokemonData = await pokemonResponse.json();

                // Noudetaan Pokemonin kuvaukset Pokemonin id:llä
                const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`)
                const speciesData = await speciesResponse.json();

                //Palautetaan lista pokemoneita joilla on id, nimi, kuva, pituus, paino, kuvaus ja ääni
                return {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default,
                    height: pokemonData.height,
                    weight: pokemonData.weight,
                    // Etsitään ensimmäinen englanninkielinen kuvaus
                    description: speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text,
                    // Apin äänet tulevat kolmannen osapuolen lähteestä, joten ne tulee hakea sieltä Pokemonin id:llä
                    sound: `https://pokemoncries.com/cries-old/${pokemonData.id}.mp3`
                };
            })
        );

        return pokemonDetails;

    } catch (error) {
        console.error('Error fetching Pokemons: ', error)
    }
}