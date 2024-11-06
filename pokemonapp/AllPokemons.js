import { View, Text } from "react-native"
import { StyleSheet, FlatList, Image } from "react-native";

export default function AllPokemons({pokemons, loading}) {

    return (

    // Testi näkyykö kuvat ja pokemonit halutusti 
        <FlatList
      data={pokemons}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
          <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
          <Text style={{ marginLeft: 10 }}>{item.name}</Text>
        </View>
      )}
    />
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