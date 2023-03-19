import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './global';

import RegisterToVote from './components/RegisterToVote';
import Home from './components/Home';
import RequestBallot from './components/RequestBallot';
import DecryptBallot from './components/DecryptBallot';
import DBAMEContext from './components/Context';
import Vote from './components/Vote';
import SubmitVote from './components/SumbitVote';
import GetElectionParameters from './components/GetElectionParameters';

const App = () => {

	const Stack = createNativeStackNavigator()

	// Election parameters
	const [domain, setDomain] = useState('http://192.168.0.16:8080');
	const [dbameVersion, setDbameVersion] = useState('');
	const [p, setP] = useState('');
	const [g, setG] = useState('');
	const [iv, setIv] = useState('');
	const [candidates, setCandidates] = useState([]);
	const [contractAddress, setContractAddress] = useState('');
	const [contractNetwork, setContractNetwork] = useState('');
	const [votingNode, setVotingNode] = useState('');
	const [votingClient, setVotingClient] = useState(''); 
	const [electionState, setElectionState] = useState('');

	// Register to vote parameters
	const [idNumber, setIdNumber] = useState('1');
	const [firstName, setFirstName] = useState('Stephane');
	const [lastName, setLastName] = useState('Augier');
	const [dob, setDob] = useState('20010618');
	const [publicKey, setPublicKey] = useState('82ca0dd7700490be21c376b7d0068dfc00d36af359de92ff52081dded770f893');

	// Request ballot parameters
	const [s, setS] = useState('');
	const [w, setW] = useState('');

	// Decrypt Ballot parameters
	const [eBC1, setEBC1] = useState('');
	const [eBC2, setEBC2] = useState('');
	const [encryptedBallot, setEncryptedBallot] = useState('');
	const [ephemeralKey, setEphemeralKey] = useState('');
	const [privateKey, setPrivateKey] = useState('4ceb41c527d79e4b6dae9d451a4d8c1c1ca4ff3113d14451bd5152829226f3fd');
	const [ballot, setBallot] = useState('');

	// Vote parameters
	const [votes, setVotes] = useState([]);

	context = {
		domain, setDomain,
		dbameVersion, setDbameVersion,
		p, setP,
		g, setG,
		iv, setIv,
		candidates, setCandidates,
		contractAddress, setContractAddress,
		contractNetwork, setContractNetwork,
		votingNode, setVotingNode,
		votingClient, setVotingClient,
		electionState, setElectionState,

		idNumber, setIdNumber,
		firstName, setFirstName,
		lastName, setLastName,
		dob, setDob,
		publicKey, setPublicKey,

		s, setS,
		w, setW,

		eBC1, setEBC1,
		eBC2, setEBC2,
		encryptedBallot, setEncryptedBallot,
		ephemeralKey, setEphemeralKey,
		privateKey, setPrivateKey,
		ballot, setBallot,

		votes, setVotes

	};

	return (
		<DBAMEContext.Provider value={context}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Welcome to d-BAME" component={Home} />
					<Stack.Screen name="Get Election Parameters" component={GetElectionParameters} />
					<Stack.Screen name="Register To Vote" component={RegisterToVote} />
					<Stack.Screen name="Request Ballot" component={RequestBallot} />
					<Stack.Screen name="Decrypt Ballot" component={DecryptBallot} />
					<Stack.Screen name="Vote" component={Vote} />
					<Stack.Screen name="Submit Vote" component={SubmitVote} />
				</Stack.Navigator>
			</NavigationContainer>
		</DBAMEContext.Provider>
	);
};

export default App;

const styles = StyleSheet.create({
	text: {
		marginTop: 30,
		marginLeft: 30,
		marginRight: 30,
		marginBottom: 30,
		alignItems: 'center'
	}
});
