import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import InputBox from './InputBox';
import { Button, Text } from "react-native-paper";
import JSONText from './JSONText';
import DBAMEContext from './Context';
import globalStyles from '../globalStyles';
import CustomButton from './CustomButton';

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
            console.debug(response.status);
            console.debug(json);
            context.setDbameVersion(json.dbameVersion);
            context.setP(json.p);
            context.setG(json.g);
            context.setIv(json.iv);
            context.setCandidates(json.candidates);
            context.setVotes(new Array(32).fill(false));
            context.setContractAddress(json.contractAddress);
            context.setContractNetwork(json.contractNetwork);
            context.setVotingNode(json.votingNode);
            context.setVotingClient(json.votingClient);
            context.setElectionState(json.electionState);
            context.setYR(json.yR);
            context.setYM(json.yM);

            setResponse(json);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView>
            <View style={globalStyles.container}>
                <InputBox name={"Domain:"} inputText={context.domain} setInputText={context.setDomain}></InputBox>
                <CustomButton onPress={handleSubmit} title="Retrieve" />
                <View style={globalStyles.response}>
                    <JSONText data={response} />
                </View>
            </View>
        </ScrollView>
    );
};

export default GetElectionParameters;
