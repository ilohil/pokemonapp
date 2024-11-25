import { View } from "react-native"
import { FlatList, Image, ActivityIndicator } from "react-native";
import { Card, IconButton, Portal } from "react-native-paper";
import { styles } from "../styles/Styles";
import { useState } from "react";
import DisplayPokemon from "../components/DisplayPokemon";
import { handleFavoritepokemons } from "../hooks/handleFavoritePokemons";

export default function AllPokemons({pokemons, loading}) {

    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Käytetään luotua hookkia
    const { favoritePokemons, toggleFavoritePokemon } = handleFavoritepokemons();

    // Etsitään Pokemon ID:llä ja asetetaan modal näkyväksi
    const showModal = (pokemonId) => {
        setSelectedPokemon(pokemons.find((p) => p.id === pokemonId));
        setModalVisible(true);
    };

    // Piilotetaan modal ja asetetaan Pokemon nulliksi 
    const hideModal = () => {
        setModalVisible(false);
        setSelectedPokemon(null);
    };

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
                <IconButton icon="information-outline" style={{marginTop: -25}}  onPress={() => showModal(item.id)}/>
            </Card.Actions>
        </Card>
        }/>

        <DisplayPokemon visible={modalVisible} onDismiss={hideModal} pokemon={selectedPokemon} />

        </View>
        </Portal.Host>
    )
}