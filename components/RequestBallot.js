import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InputBox from './InputBox';
import { Button, Text } from "react-native-paper";

const RequestBallot = ({navigation}) => {
    const [idNumber, setIdNumber] = useState('1');
    const [firstName, setFirstName] = useState('Stephane');
    const [lastName, setLastName] = useState('Augier');
    const [dob, setDob] = useState('20010618');
    const [publicKey, setPublicKey] = useState('1');
    const [s, setS] = useState('1');
    const [w, setW] = useState('1');

    const [response, setResponse] = useState('');


    const handleSubmit = async () => {
        console.debug('Form submitted:', { idNumber, lastName, dob, firstName, publicKey, s, w });
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": parseInt(idNumber),
                    "firstName": firstName,
                    "lastName": lastName,
                    "dob": dob,
                    "publicKey": publicKey,
                    "s": s,
                    "w": w
                })
            };
            const response = await fetch('http://192.168.0.16:8080/moderator/requestBallot', requestOptions)
            const json = await response.json();
            console.debug(response.status)
            console.debug(json)
            setResponse(json);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView>
            <InputBox name={"ID:"} inputText={idNumber} setInputText={setIdNumber}></InputBox>
            <InputBox name={"First Name:"} inputText={firstName} setInputText={setFirstName}></InputBox>
            <InputBox name={"Last Name:"} inputText={lastName} setInputText={setLastName}></InputBox>
            <InputBox name={"DOB:"} inputText={dob} setInputText={setDob}></InputBox>
            <InputBox name={"Public Key:"} inputText={publicKey} setInputText={setPublicKey}></InputBox>
            <InputBox name={"S:"} inputText={s} setInputText={setS}></InputBox>
            <InputBox name={"W:"} inputText={w} setInputText={setW}></InputBox>


            <Button style={styles.button} mode="contained" onPress={handleSubmit} >
                Request</Button>

            <View style={styles.response}>
                {Object.keys(response).map((key, index) => (
                    <View key={index}>
                        <Text>{key}: {response[key]}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default RequestBallot;

const styles = StyleSheet.create({
    button: {
        marginTop: 30,
        marginLeft: 50,
        marginRight: 50,
        alignItems: 'center'
    },
    response: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30
    },
})