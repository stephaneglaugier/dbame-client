import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InputBox from './InputBox';
import { Button, Text } from "react-native-paper";
import JSONText from './JSONText';
import DBAMEContext from './Context';

const GetElectionParameters = ({ navigation }) => {

    const context = React.useContext(DBAMEContext);

    const [response, setResponse] = useState('');

    const handleSubmit = async () => {
        try {
            const requestOptions = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            };
            const response = await fetch(`${context.domain}/registrar/electionParams`, requestOptions)
            const json = await response.json();
            console.debug(response.status)
            console.debug(json)
            context.setDbameVersion(json.dbameVersion)
            context.setP(json.p)
            context.setG(json.g)
            context.setIv(json.iv)
            context.setCandidates(json.candidates)
            context.setVotes(new Array(context.candidates.length).fill(false))
            setResponse(json);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView>
            <InputBox name={"Domain:"} inputText={context.domain} setInputText={context.setDomain}></InputBox>

            <Button style={styles.button} mode="contained" onPress={handleSubmit} >
                Retrieve</Button>

            <View style={styles.response}>
                <JSONText data={response} />
            </View>

        </ScrollView>
    );
};

export default GetElectionParameters;

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
