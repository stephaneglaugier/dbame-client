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
	const [publicKey, setPublicKey] = useState('987966b30b904653bab0f6e234fa0442cac5e4a779124cd4c9fd6ea176852a4d99977364e5d2d68963816fb7303bbb8a2eced97626eaf216e67d0a121c32facd22746e72a6975761a5df7520891d2089b61f09629ac43148542a9a686d823ab9fb4dbfc8936f8a0e1eb66780a43edf6e9ab5f8314512b76b1d2d294b8f24d0184c38341806b0eac08d7ab2dc34095a945e49ec1f3bf88207b226f9775e807006db92d10a5a8894948ff8824adb74219c7613b0ceccb0cb25e6ed3d16d012aa58d20c0caa282e4a4352b11c60b3e3acd0d7c8382ce9616288b99439c83f17f714a990537715d7bea14dcb67135c5fa25a895baa7d01d63043abec5a3c9cfaecf4');

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
