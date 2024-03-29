import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InputBox from './InputBox';
import { Button, Text } from "react-native-paper";
import JSONText from './JSONText';
import DBAMEContext from './Context';
import globalStyles from '../globalStyles';
import CustomButton from './CustomButton';

const RegisterToVote = ({ navigation }) => {

    const [response, setResponse] = useState('');

    const context = React.useContext(DBAMEContext);

    const handleSubmit = async () => {
        // console.debug('Form submitted:', { idNumber, lastName, dob, firstName, publicKey });
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
                    "publicKey": context.publicKey
                })
            };
            const response = await fetch(`${context.domain}/registrar/registerToVote`, requestOptions)
            const json = await response.json();
            console.debug(response.status)
            console.debug(json)
            context.setW(json.w);
            context.setS(json.s);
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

                <CustomButton onPress={handleSubmit} title="Register" />

                <View style={globalStyles.response}>
                    <JSONText data={response} />
                </View>
            </View>


        </ScrollView>
    );
};

export default RegisterToVote;
