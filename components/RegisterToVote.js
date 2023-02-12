import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InputBox from './InputBox';
import { Button, Text } from "react-native-paper";
import JSONText from './JSONText';


const RegisterToVote = ({ navigation }) => {
    const [idNumber, setIdNumber] = useState('1');
    const [firstName, setFirstName] = useState('Stephane');
    const [lastName, setLastName] = useState('Augier');
    const [dob, setDob] = useState('20010618');
    const [publicKey, setPublicKey] = useState('1');

    const [response, setResponse] = useState('');


    const handleSubmit = async () => {
        console.debug('Form submitted:', { idNumber, lastName, dob, firstName, publicKey });
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
                    "publicKey": publicKey
                })
            };
            const response = await fetch('http://192.168.0.4:8080/registrar/registerToVote', requestOptions)
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

            <Button style={styles.button} mode="contained" onPress={handleSubmit} >
                Register</Button>

            <View style={styles.response}>
                <JSONText data={response} />
            </View>

        </ScrollView>
    );
};

export default RegisterToVote;

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
