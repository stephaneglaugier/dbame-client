import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import InputBox from './InputBox';
import { Button } from "react-native-paper";

const RegisterForm = () => {
    const [idNumber, setIdNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');

    const handleSubmit = () => {
        // handle form submission here, e.g. send data to server
        console.log('Form submitted:', { firstName, lastName, dob, idNumber });
    }

    return (
        <View>
            <InputBox name={"ID:"} inputText={idNumber} setInputText={setIdNumber}></InputBox>
            <InputBox name={"First Name:"} inputText={firstName} setInputText={setFirstName}></InputBox>
            <InputBox name={"Last Name:"} inputText={lastName} setInputText={setLastName}></InputBox>
            <InputBox name={"DOB:"} inputText={dob} setInputText={setDob}></InputBox>


            <Button style={styles.button} mode="contained" onPress={handleSubmit} >
                Register to vote</Button>
        </View>
    );
};

export default RegisterForm;

const styles = StyleSheet.create({
    button: {
        marginTop: 60,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center'
    },
})
