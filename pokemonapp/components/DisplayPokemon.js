import { Image, View } from "react-native";
import { Modal, Portal, Text, Button } from "react-native-paper";
import { styles } from "../styles/Styles";
import { Audio } from "expo-av";
import { useState, useEffect } from "react";

export default function DisplayPokemon({ visible, onDismiss, pokemon }) {

    const [sound, setSound] = useState();

    // Ladataan Pokemonin ääni ja toistetaan se
    const playSound = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: pokemon.sound }
            );
            setSound(sound);
            await sound.playAsync();
        } catch (error) {
            console.error("Error playing sound", error);
        }
    };

    // Poistaa äänen muistista
    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (

        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
                {pokemon ? (
                    <View>
                        <Text style={styles.titleText}>{pokemon.name}</Text>
                        <Image source={{ uri: pokemon.image }} style={styles.image} />
                        <Text style={styles.globalText}>Weight: {pokemon.weight} </Text>
                        <Text style={styles.globalText}>Height: {pokemon.height}</Text>
                        <Text style={styles.globalText}>{pokemon.description}</Text>
                        <Text style={styles.globalText}>HP: {pokemon.health}</Text>
                        <Text style={styles.globalText}>Attack: {pokemon.move.name}, {pokemon.move.power} dmg </Text>
                        <Button mode='contained' style={styles.button} textColor='black' icon='music' onPress={playSound}>Play sound</Button>
                    </View>
                ) : (
                    <Text>Loading...</Text>
                )}
            </Modal>
        </Portal>
    )
}
