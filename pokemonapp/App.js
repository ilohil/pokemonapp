import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, Appbar, BottomNavigation, Searchbar, ActivityIndicator } from 'react-native-paper';
import AllPokemons from './screens/AllPokemons';
import FavoritePokemons from './screens/FavoritePokemons';
import { fetchPokemons } from './api/Api';
import { initialize } from './utils/SQLite';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { styles, theme } from './styles/Styles';
import { useFonts } from 'expo-font';

export default function App() {

  const [index, setIndex] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  // Haetaan pokemonit, jotta ne voidaan välittää muille komponenteille propsina navigaatiossa ja käynnistetään tietokanta
  useEffect(() => {
    initialize();
    fetchAllPokemons();
  }, []);

  const fetchAllPokemons = async () => {
    setLoading(true);
    const data = await fetchPokemons();
    setPokemons(data || []);
    setFilteredPokemons(data || []);
    setLoading(false);
  }

  // Ladataan fontit
  const [fontsLoaded] = useFonts({
    'KirangHaerang': require('./assets/fonts/Kirang_Haerang/KirangHaerang-Regular.ttf'),
    'Orbitron': require('./assets/fonts/Orbitron/static/Orbitron-Regular.ttf'),
    'RubikIso': require('./assets/fonts/Rubik_Iso/RubikIso-Regular.ttf'),
    'SixtyfourConvergence': require('./assets/fonts/Sixtyfour_Convergence/static/SixtyfourConvergence-Regular.ttf'),
    'Tomorrow': require('./assets/fonts/Tomorrow/Tomorrow-Regular.ttf'),
    'VT323': require('./assets/fonts/VT323/VT323-Regular.ttf'),
  });

  // Päivitetään Pokemonlistaa, jos hakuteksti muuttuu
  useEffect(() => {
    if (search === '') {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  }, [search, pokemons]);

  // Asetetaan navigoinnille tekstit ja ikonit
  const routes = [
    { key: 'home', title: 'Home', focusedIcon: 'home' },
    { key: 'favorites', title: 'Favorites', focusedIcon: 'heart' }
  ];

  // Asetetaan navigoinnin avaimille osoitteet
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        return <AllPokemons pokemons={filteredPokemons} loading={loading} />;
      case 'favorites':
        return <FavoritePokemons pokemons={filteredPokemons} loading={loading} />;
      default:
        return <AllPokemons pokemons={filteredPokemons} loading={loading} />;
    }
  };

  //Funktio hakuinputin näyttämiselle ja piilottamiselle

  const handleSearchPress = () => {
    setShowSearch((prev) => !prev);

    if (showSearch) {
      setSearch('')
    };
  };

  return (
    <PaperProvider theme={theme}>

      {!fontsLoaded ? (
        <ActivityIndicator size="large" />
      ) : (

        <NavigationContainer>

          <Appbar mode="medium" elevated safeAreaInsets={{ top: 0 }} style={styles.appbar}>
            <Appbar.Content titleStyle={styles.appbarcontent} title="Pokémon app" />
            <Appbar.Action style={styles.appbaraction} size={30} icon="magnify" onPress={handleSearchPress} />
          </Appbar>

          {showSearch && (
            <View style={{ backgroundColor: 'rgb(247, 224, 148)' }}>
              <Searchbar
                placeholder='Search Pokémon'
                value={search}
                onChangeText={setSearch}
                style={{ marginTop: 15 }}
              />
            </View>
          )}

          <BottomNavigation
            key={routes[index].key}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={styles.bottomnavi}
            style={{ surface: 'blue', secondaryContainer: 'blue' }}
            activeColor='rgb(237, 187, 50)'
            inactiveColor='rgb(0, 0, 0)'

          >



          </BottomNavigation>

          <StatusBar style="auto" />
        </NavigationContainer>
      )}
    </PaperProvider>
  );
}

