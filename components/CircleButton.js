import {View, Pressable, StyleSheet} from 'react-native';
import MetarialIcons from '@expo/vector-icons/MaterialIcons';

export default function CircleButton({onPress}) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.CircleButton} onPress={onPress}>
                <MetarialIcons name="add" size={38} color="#25292e" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 84,
        height: 84,
        marginHorizontal: 60,
        borderWidth: 4,
        borderColor: "#ffd33d",
        borderRadius: 42,
        padding: 3,
    },
    CircleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
        backgroundColor: "#fff",
    },
});