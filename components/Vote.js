import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InputBox from './InputBox';
import { Button, Text } from "react-native-paper";
import DoubleInputBox from './DoubleInputBox';
import DBAMEContext from './Context';
import JSONText from './JSONText';
import Ballot from './Ballot';
import globalStyles from '../globalStyles';


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
            <View style={globalStyles.container}>
                <View style={globalStyles.result}>
                    <InputBox name={"Ballot:"} inputText={context.ballot} setInputText={context.setBallot}></InputBox>
                    <Ballot switchData={context.candidates} />
                </View>
                <Button style={globalStyles.button} mode="contained" onPress={handleSubmit} >
                    Vote</Button>
                <View style={globalStyles.result}>
                    <JSONText data={context.ballot} />
                </View>
            </View>
        </ScrollView>
    );
};

export default Vote;
