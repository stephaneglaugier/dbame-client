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
        const voteString = booleanArrayToHex(context.votes)
        context.setBallot(context.ballot.substring(0, 24) + voteString)
    }

    const booleanArrayToHex = (boolArray) => {
        let hex = '';
        for (let i = 0; i < boolArray.length; i += 4) {
            const nibble = boolArray.slice(i, i + 4);
            const nibbleInt = nibble.reduce((acc, val) => acc * 2 + val);
            const nibbleHex = nibbleInt.toString(16);
            hex += nibbleHex;
        }
        return hex;
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
                <JSONText data={context.ballot} />
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
