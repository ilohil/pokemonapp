import { View, Text } from "react-native"
import { StyleSheet, FlatList, Image, ActivityIndicator } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { styles } from "./Styles";

export default function AllPokemons({pokemons, loading}) {

    return (
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
                <IconButton icon="heart-outline" style={{marginTop: -25, marginRight: 35}}/>
                <IconButton icon="information-outline" style={{marginTop: -25}} />
            </Card.Actions>
        </Card>
        }
        
        />

        </View>
    )
}