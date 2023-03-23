import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InputBox from './InputBox';
import { Button, Text } from "react-native-paper";
import JSONText from './JSONText';
import DBAMEContext from './Context';
import globalStyles from '../globalStyles';
import CustomButton from './CustomButton';


const RequestBallot = ({ navigation }) => {

    const context = React.useContext(DBAMEContext);

    const [response, setResponse] = useState('');

    const handleSubmit = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": parseInt(context.idNumber),
                    "firstName": context.firstName,
                    "lastName": context.lastName,
                    "dob": context.dob,
                    "publicKey": context.publicKey,
                    "s": context.s,
                    "w": context.w
                })
            };
            const response = await fetch(`${context.domain}/moderator/requestBallot`, requestOptions)
            const json = await response.json();
            console.debug(response.status);
            console.debug(json);
            context.setEBC1(json.encryptedBlindFactor[0]);
            context.setEBC2(json.encryptedBlindFactor[1]);
            context.setEncryptedBallot(json.encryptedBallot);
            context.setEphemeralKey(json.ephemeralKey);
            setResponse(json);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView>
            <View style={globalStyles.container}>
                <InputBox name={"ID:"} inputText={context.idNumber} setInputText={context.setIdNumber}></InputBox>
                <InputBox name={"First Name:"} inputText={context.firstName} setInputText={context.setFirstName}></InputBox>
                <InputBox name={"Last Name:"} inputText={context.lastName} setInputText={context.setLastName}></InputBox>
                <InputBox name={"DOB:"} inputText={context.dob} setInputText={context.setDob}></InputBox>
                <InputBox name={"Public Key:"} inputText={context.publicKey} setInputText={context.setPublicKey}></InputBox>
                <InputBox name={"S:"} inputText={context.s} setInputText={context.setS}></InputBox>
                <InputBox name={"W:"} inputText={context.w} setInputText={context.setW}></InputBox>

                <CustomButton onPress={handleSubmit} title="Request"/>

                <View style={globalStyles.response}>
                    <JSONText data={response} />
                </View>
            </View>

        </ScrollView>
    );
};

export default RequestBallot;
