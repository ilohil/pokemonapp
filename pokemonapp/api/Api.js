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
                const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`);
                const speciesData = await speciesResponse.json();

                // Erotellaan pokemonin tyypit

                const typeData = pokemonData.types.map(type => type.type.name).join(", ");

                // Etsitään pokemonin isku ja sen damage
                let moveName = 'N/A'
                let movePower = 'N/A'

                if (pokemonData.moves.length > 0) {
                    moveName = pokemonData.moves[0].move.name;
                    const moveResponse = await fetch(pokemonData.moves[0].move.url);
                    const moveData = await moveResponse.json();
                    movePower = moveData.power || 'N/A'
                }

                // Etsitään pokemonin hp
                const hp = pokemonData.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 'N/A';

                // Tehdään muotoiluja saadulle datalle

                const name = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1).toLowerCase();
                const weight = `${pokemonData.weight / 10} kg`
                const height = `${pokemonData.height / 10} m`
                const move = moveName.charAt(0).toUpperCase() + moveName.slice(1).toLowerCase();

                //Palautetaan lista pokemoneita joilla on id, nimi, tyypit, kuva, pituus, paino, kuvaus ja ääni
                return {
                    id: pokemonData.id,
                    name: name,
                    types: typeData,
                    image: pokemonData.sprites.front_default,
                    height: height,
                    weight: weight,
                    // Etsitään ensimmäinen englanninkielinen kuvaus
                    description: speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text,
                    // Apin äänet tulevat kolmannen osapuolen lähteestä, joten ne tulee hakea sieltä Pokemonin id:llä
                    sound: `https://pokemoncries.com/cries-old/${pokemonData.id}.mp3`,
                    health: hp,
                    move: {name: move, power: movePower},
                };
            })
        );

        return pokemonDetails;

    } catch (error) {
        console.error('Error fetching Pokemons: ', error)
    }
}