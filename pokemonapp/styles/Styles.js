import { StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(237, 187, 50)',
        onPrimary: 'rgb(0, 0, 0)',
        backdrop: 'rgba(255, 0, 0, 0.3)',
        background: 'rgb(247, 224, 148)',
        text: 'rgb(0,0,0)',
        tertiary: 'blue',
        onTertiary: 'blue',
        onTertiaryContainer: 'blue',
        surface: 'blue'
    },
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Tomorrow',
        backgroundColor: 'rgb(247, 224, 148)'
    },
    image: {
        width: 120,
        height: 120
    },
    card: {
        width: 150,
        height: 200,
        margin: 10,
        backgroundColor: 'rgb(245, 236, 208)'
    },
    modal: {
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    appbar: {
        backgroundColor: 'rgb(245, 64, 64)'
    },
    appbarcontent: {
        marginLeft: 5,
        fontFamily: "SixtyfourConvergence",
        color: 'rgb(237, 187, 50)',
        fontSize: 25,
    },
    appbaraction: {
        marginTop: 95,
        marginRight: 20,
        backgroundColor: 'rgb(237, 187, 50)',
    },
    bottomnavi: {
        backgroundColor: 'rgb(245, 64, 64)',
        secondaryContainer: 'blue'
    },
    button: {
        backgroundColor: 'rgb(245, 64, 64)',
        padding: 5,
        marginBottom: 10,
        marginTop: 10,
    },
    heartbutton: {
        marginTop: -25,
        marginRight: 30,
        borderColor: 'red'
    },
    infobutton: {
        marginTop: -25,
        backgroundColor: 'rgb(245, 236, 208)',
        borderBlockColor: 'black'
    },
    globalText: {
        fontFamily: 'Tomorrow',
        color: 'black'
    },
    titleText: {
        fontFamily: 'Tomorrow',
        color: 'black',
        fontSize: 25
    },
    snackbar: {
        backgroundColor: 'rgb(237, 187, 50)',
    }
});