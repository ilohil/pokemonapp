import { View } from "react-native"
import { FlatList, Image, ActivityIndicator } from "react-native";
import { Card, IconButton, Portal, Button, Dialog } from "react-native-paper";
import { styles } from "../styles/Styles";
import DisplayPokemon from "../components/DisplayPokemon";
import { handleFavoritepokemons } from "../hooks/handleFavoritePokemons";
import { useModal } from "../hooks/useModal";
import { useContacts } from "../hooks/useContacts";
import { SelectList } from "react-native-dropdown-select-list";
import ShowSnackBar from "../components/ShowSnackBar";

export default function FavoritePokemons({ pokemons, loading }) {

  // Käytetään luotuja hookkeja 
  const { favoritePokemons, toggleFavoritePokemon, snackVisible, snackMessage, dismissSnackBar } = handleFavoritepokemons();
  const { selectedPokemon, modalVisible, showModal, hideModal } = useModal();
  const { visible, formattedContacts, showDialog, hideDialog, sendSms, setSelect, selected } = useContacts();

  // Luodaan lista suosikkipokemoneille
  const favoritePokemonList = pokemons.filter(pokemon => favoritePokemons.some(fav => fav.pokemonId === pokemon.id));

  return (
    <Portal.Host>
      <View style={styles.container}>

        {loading && <ActivityIndicator size='large' />}

        <View >

          <FlatList
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            data={favoritePokemonList}
            ListHeaderComponent={
              <Button mode='contained' icon='message-text-outline' style={styles.button} onPress={showDialog}>Share your favorite Pokémons!</Button>
            }
            renderItem={({ item }) =>
              <Card style={styles.card}>
                <Card.Title title={item.name} titleStyle={styles.globalText} />
                <Card.Content>
                  <Image source={{ uri: item.image }} style={styles.image} />
                </Card.Content>
                <Card.Actions>
                  <IconButton icon="heart" style={styles.heartbutton} size={15} iconColor="rgb(245, 64, 64)" onPress={() => toggleFavoritePokemon(item.id)} />
                  <IconButton icon="information-outline" style={styles.infobutton} iconColor="rgb(0, 0, 0)" size={30} onPress={() => showModal(pokemons, item.id)} />
                </Card.Actions>
              </Card>
            } />

        </View>

        <DisplayPokemon visible={modalVisible} onDismiss={hideModal} pokemon={selectedPokemon} />

        <ShowSnackBar visible={snackVisible} message={snackMessage} dismissSnackBar={dismissSnackBar} />

        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Select a contact</Dialog.Title>
          <Dialog.Content>
            <SelectList
              setSelected={(id) => setSelect(id)}
              data={formattedContacts}
              save="key"
            />

          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => sendSms(favoritePokemonList)} disabled={selected === ""}>Send</Button>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>

        </Dialog>

      </View>
    </Portal.Host>
  )
}