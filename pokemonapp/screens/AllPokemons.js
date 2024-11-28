import { View } from "react-native"
import { FlatList, Image, ActivityIndicator } from "react-native";
import { Card, IconButton, Portal } from "react-native-paper";
import { styles } from "../styles/Styles";
import DisplayPokemon from "../components/DisplayPokemon";
import { handleFavoritepokemons } from "../hooks/handleFavoritePokemons";
import { useModal } from "../hooks/useModal";

export default function AllPokemons({pokemons, loading}) {

    // Käytetään luotuja hookkeja 
    const { favoritePokemons, toggleFavoritePokemon } = handleFavoritepokemons();
    const { selectedPokemon, modalVisible, showModal, hideModal } = useModal();

    return (
        <Portal.Host>
        <View style={styles.container}>

        {loading && <ActivityIndicator size='large' />}

        <FlatList 
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        data={pokemons}
        renderItem={({item}) =>
        <Card style={styles.card}>
            <Card.Title title={item.name}/>
            <Card.Content>
                <Image source={{ uri: item.image }} style={styles.image}/>
            </Card.Content>
            <Card.Actions>
                <IconButton icon={favoritePokemons.some(fav => fav.pokemonId === item.id) ? "heart" : "heart-outline"} style={{marginTop: -25, marginRight: 35}} onPress={() => toggleFavoritePokemon(item.id)}/>
                <IconButton icon="information-outline" style={{marginTop: -25}}  onPress={() => showModal(pokemons, item.id)}/>
            </Card.Actions>
        </Card>
        }/>

        <DisplayPokemon visible={modalVisible} onDismiss={hideModal} pokemon={selectedPokemon} />

        </View>
        </Portal.Host>
    )
}