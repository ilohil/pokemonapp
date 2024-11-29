import { Snackbar, Text } from "react-native-paper";
import { styles } from "../styles/Styles";

export default function ShowSnackBar({ visible, message, dismissSnackBar }) {
    return (
        <Snackbar
            visible={visible}
            style={styles.snackbar}
            onDismiss={dismissSnackBar}
            duration={1500}
            action={{
                label: 'Dismiss',
                onPress: dismissSnackBar,
                textColor: 'rgb(245, 64, 64)'
            }}
        >
            <Text style={styles.globalText}>{message}</Text>
        </Snackbar>
    )
}