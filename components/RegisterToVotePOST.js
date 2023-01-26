import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button } from "react-native-paper";

const RegisterToVote = () => {

    const [data, setData] = useState(0);

    const requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": 2,
            "firstName": "Stephane",
            "lastName": "Augier",
            "dob": "2001-06-18",
            "publicKey": "10f1"
        })
    };

    const request = async () => {
        try {
            const response = await fetch('http://192.168.0.4:8080/registrar/registerToVote', requestOptions)
            const json = await response.json();
            return json;
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleButtonPress = async () => {
        const json = await request();
        setData(json);
    }

    return (
        <View>
            <View style={styles.s}>
                {Object.keys(data).map((key, index) => (
                    <View key={index}>
                        <Text>{key}: {data[key]}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.s}>
                <Button mode="contained" onPress={handleButtonPress} >
                    Register to vote</Button>
            </View>
        </View>
    )

}

export default RegisterToVote;

const styles = StyleSheet.create({
    s: {
        marginTop: 60,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center'
    },
})