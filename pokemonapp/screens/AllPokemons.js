import { View } from "react-native"
import { FlatList, Image, ActivityIndicator } from "react-native";
import { Card, IconButton, Portal } from "react-native-paper";
import { styles } from "../styles/Styles";
import DisplayPokemon from "../components/DisplayPokemon";
import { handleFavoritepokemons } from "../hooks/handleFavoritePokemons";
import { useModal } from "../hooks/useModal";
import ShowSnackBar from "../components/ShowSnackBar";

export default function AllPokemons({ pokemons, loading }) {

    // Käytetään luotuja hookkeja 
    const { favoritePokemons, toggleFavoritePokemon, snackVisible, snackMessage, dismissSnackBar } = handleFavoritepokemons();
    const { selectedPokemon, modalVisible, showModal, hideModal } = useModal();

    return (
        <Portal.Host>
            <View style={styles.container}>

                {loading && <ActivityIndicator size='large' />}

                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    data={pokemons}
                    renderItem={({ item }) => {
                        const isFavorite = favoritePokemons.some(fav => fav.pokemonId === item.id);
                        return (
                            <Card style={styles.card} >
                                <Card.Title title={item.name} style={styles.globalText} titleStyle={styles.globalText} />
                                <Card.Content>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                </Card.Content>
                                <Card.Actions>
                                    <IconButton icon={isFavorite ? "heart" : "heart-outline"} style={styles.heartbutton} size={15} iconColor="rgb(245, 64, 64)" onPress={() => toggleFavoritePokemon(item.id)} />
                                    <IconButton icon="information-outline" style={styles.infobutton} iconColor="rgb(0, 0, 0)" size={30} onPress={() => showModal(pokemons, item.id)} />
                                </Card.Actions>
                            </Card>
                        );
                    }} />

                <DisplayPokemon visible={modalVisible} onDismiss={hideModal} pokemon={selectedPokemon} />
                <ShowSnackBar visible={snackVisible} message={snackMessage} dismissSnackBar={dismissSnackBar} />

            </View>
        </Portal.Host>
    )
}