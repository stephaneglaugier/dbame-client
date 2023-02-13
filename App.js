import React, { createContext, useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterToVote from './components/RegisterToVote';
import Home from './components/Home';
import RequestBallot from './components/RequestBallot';
import DecryptBallot from './components/DecryptBallot';
import DBAMEContext from './components/dbameContext';

const App = () => {

  const Stack = createNativeStackNavigator();

  const [idNumber, setIdNumber] = useState('1');
  const [firstName, setFirstName] = useState('Stephane');
  const [lastName, setLastName] = useState('Augier');
  const [dob, setDob] = useState('20010618');
  const [publicKey, setPublicKey] = useState('2775');
  const [s, setS] = useState('');
  const [w, setW] = useState('');
  const [eBC1, setEBC1] = useState('');
  const [eBC2, setEBC2] = useState('');
  const [encryptedBallot, setEncryptedBallot] = useState('');
  const [ephemeralKey, setEphemeralKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  context = {
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
  };

  return (
    <DBAMEContext.Provider value={context}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome to d-BAME" component={Home} />
          <Stack.Screen name="Register To Vote" component={RegisterToVote} />
          <Stack.Screen name="Request Ballot" component={RequestBallot} />
          <Stack.Screen name="Decrypt Ballot" component={DecryptBallot} />
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
