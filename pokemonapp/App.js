import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, Appbar, BottomNavigation } from 'react-native-paper';
import AllPokemons from './AllPokemons';
import FavoritePokemons from './FavoritePokemons';
import { fetchPokemons } from './Api';

export default function App() {

  const [index, setIndex] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  // Haetaan pokemonit, jotta ne voidaan välittää muille komponenteille propsina navigaatiossa
  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      const data = await fetchPokemons();
      setPokemons(data || []); // Asetetaan tyhjä lista, jos dataa ei löydy
      setLoading(false);
    };
    handleFetch();
  }, []);

  // Asetetaan navigoinnille tekstit ja ikonit
  const [routes] = useState([
    {key: 'home', title: 'Home', focusedIcon: 'home'},
    {key: 'favorites', title: 'Favorites', focusedIcon: 'heart'}
  ]);

  // Asetetaan navigoinnin avaimille osoitteet
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        return <AllPokemons pokemons={pokemons} loading={loading} />;
      case 'favorites':
        return <FavoritePokemons pokemons={pokemons} loading={loading} />;
      default:
        return null;
    }
  };

  return (
    <PaperProvider>

      <Appbar mode="medium" elevated>
        <Appbar.Content title="Pokemon app" />
      </Appbar>

      <BottomNavigation 
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />

      <StatusBar style="auto" />
    </PaperProvider>
  )
}


