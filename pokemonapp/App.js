import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, Appbar, BottomNavigation , TextInput, Searchbar} from 'react-native-paper';
import AllPokemons from './screens/AllPokemons';
import FavoritePokemons from './screens/FavoritePokemons';
import { fetchPokemons } from './api/Api';
import { initialize } from './utils/SQLite';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <NavigationContainer>
      <PaperProvider>

        <Appbar mode="medium" elevated>
          <Appbar.Content style={{ marginLeft: 30 }}title="Pokémon app" />
          <Appbar.Action style={{marginTop: 100, marginRight: 50, backgroundColor: 'lightblue'}} size={33} icon="magnify" onPress={handleSearchPress} />
        </Appbar>


        {showSearch && (
          <View>
          <Searchbar 
            placeholder='Search Pokémon'
            value={search}
            onChangeText={setSearch}
            style={{marginTop: 15}}
          />
          </View>
        )}

        <BottomNavigation
          key={routes[index].key}
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          
        />

        <StatusBar style="auto" />
      </PaperProvider>
    </NavigationContainer>
  );
}


