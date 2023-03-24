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
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError('');
        try {
            const requestOptions = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            };
            const response = await fetch(`${context.domain}/registrar/electionParams`, requestOptions)
            console.log(response);
            const json = await response.json();
            if (response.ok) {
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
            } else {
                console.error(`Error: ${response.status} ${json.message}`);
                setError(`${response.status}: ${json.message}`);
            }
            
        }
        catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <ScrollView>
            <View style={globalStyles.container}>
                <InputBox name={"Domain:"} inputText={context.domain} setInputText={context.setDomain}></InputBox>
                <CustomButton onPress={handleSubmit} title="Retrieve" />
                {error ? (
                    <View>
                        <Text style={globalStyles.errorText}>{error}</Text>
                    </View>
                ) : null}
                <View style={globalStyles.response}>
                    <JSONText data={response} />
                </View>
            </View>
        </ScrollView>
    );
};

export default GetElectionParameters;
