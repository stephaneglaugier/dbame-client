import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

const Candidate = ({ text, value, onValueChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: "#C4C4C4", true: "#F5D780" }}
                thumbColor={value ? "#F5D780" : "#f4f3f4"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        flex: 1,
        marginLeft: 10,
    },
});

export default Candidate;
