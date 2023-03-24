import React, { useState } from 'react';
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
	const [domain, setDomain] = useState('http://192.168.0.4:8080');
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
	const [idNumber, setIdNumber] = useState('10');
	const [firstName, setFirstName] = useState('Kevin');
	const [lastName, setLastName] = useState('Taylor');
	const [dob, setDob] = useState('19900314');
	const [publicKey, setPublicKey] = useState('1eeaad156b849b08537b311813c295d7b83b715001b4e5bb74193511fa1bdc571543aca15d1a033867464719e2dcb4f7dea6b9aeacb1ea466b30813bb4d17324');

	// Request ballot parameters
	const [s, setS] = useState('');
	const [w, setW] = useState('');

	// Decrypt Ballot parameters
	const [eBC1, setEBC1] = useState('');
	const [eBC2, setEBC2] = useState('');
	const [encryptedBallot, setEncryptedBallot] = useState('');
	const [ephemeralKey, setEphemeralKey] = useState('');
	const [privateKey, setPrivateKey] = useState('3afd9e134cd55eacd581ef6df9857466e4d5cd21c7ec4b9c16165e2a0717c096d2718b240856c08f5793e162eda8bc6f088e7d549e37e12688ef3484f0077f3c');
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
