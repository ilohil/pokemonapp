import { Image, View } from "react-native";
import { Modal, Portal, Text, Button } from "react-native-paper";
import { styles } from "./Styles";
import { Audio } from "expo-av";
import { useState, useEffect } from "react";

export default function DisplayPokemon({visible, onDismiss, pokemon}) {

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
                        <Text style={styles.title}>{pokemon.name}</Text>
                        <Image source={{ uri: pokemon.image }} style={styles.image} />
                        <Text>Weight: {pokemon.weight / 10} kg </Text>
                        <Text>Height: {pokemon.height / 10} m</Text>
                        <Text>{pokemon.description}</Text>
                        <Button onPress={playSound}>Play sound</Button>
                    </View>
                ) : (
                    <Text>Loading...</Text>
                )}
            </Modal>
        </Portal>
    )
}
