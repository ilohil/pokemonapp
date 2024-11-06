import { useState } from "react";
import { View, Text } from "react-native"
import { StyleSheet } from "react-native";

export default function FavoritePokemons() {

    return (
        <View style={styles.container}>
            <Text>Favorite pokemons!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });