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
import EncryptBallot from './components/EncryptBallot';
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
	const [yR, setYR] = useState('');
	const [yM, setYM] = useState('');

	// Register to vote parameters
	const [idNumber, setIdNumber] = useState('1');
	const [firstName, setFirstName] = useState('Stephane');
	const [lastName, setLastName] = useState('Augier');
	const [dob, setDob] = useState('20010618');
	const [publicKey, setPublicKey] = useState('25f0c3f97b3832ca1312acf9e169e10f25dcd073967b53c7025d287253aa5f539c95d70af81f9c514a4c796d9acea1ba311b7b4d6df660d11e1b15114c9af3cc');

	// Request ballot parameters
	const [s, setS] = useState('');
	const [w, setW] = useState('');

	// Decrypt Ballot parameters
	const [eBC1, setEBC1] = useState('');
	const [eBC2, setEBC2] = useState('');
	const [encryptedBallot, setEncryptedBallot] = useState('');
	const [ephemeralKey, setEphemeralKey] = useState('');
	const [privateKey, setPrivateKey] = useState('1234');
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
		yR, setYR,
		yM, setYM,

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
					<Stack.Screen name="Encrypt Vote" component={EncryptBallot} />
				</Stack.Navigator>
			</NavigationContainer>
		</DBAMEContext.Provider>
	);
};

export default App;
