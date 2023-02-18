import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InputBox from './InputBox';
import { Button, Text } from "react-native-paper";
import DoubleInputBox from './DoubleInputBox';
import DBAMEContext from './Context';
import JSONText from './JSONText';
import Ballot from './Ballot';


const Vote = ({ navigation }) => {

    const context = React.useContext(DBAMEContext);


    const handleSubmit = () => {
        console.debug(context.votes, context.ballot)
    }

    return (
        <ScrollView >
            <View style={styles.result}>
            <InputBox name={"Ballot:"} inputText={context.ballot} setInputText={context.setBallot}></InputBox>
                <Ballot switchData={context.candidates} />
            </View>
            <Button style={styles.button} mode="contained" onPress={handleSubmit} >
                Vote</Button>
            <View style={styles.result}>
                <JSONText data={[context.votes, context.ballot]} />
            </View>

        </ScrollView>
    );
};

export default Vote;

const styles = StyleSheet.create({
    button: {
        marginTop: 30,
        marginLeft: 50,
        marginRight: 50,
        alignItems: 'center'
    },
    result: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30
    },
})
