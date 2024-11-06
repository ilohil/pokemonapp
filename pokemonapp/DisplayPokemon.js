import { useState } from "react";
import { View, Text } from "react-native"
import { StyleSheet } from "react-native";

export default function DisplayPokemon() {

    return (
        <View style={styles.container}>
            <Text>DisplayPokemon !</Text>
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