import React from 'react';
import { TouchableOpacity, Text, StyleSheet , View} from 'react-native';

const CustomButton = ({ onPress, title, style }) => {
    return (
        <View style={styles.view}>
            <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>

    );
};

export default CustomButton;

const styles = StyleSheet.create({
    view: {
        padding: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'purple',
        borderRadius: 15,
        width: 250,
        height: 50
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});
