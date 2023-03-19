import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InputBox from './InputBox';
import { Button, Text } from "react-native-paper";


const SubmitVote = ({ navigation }) => {

    var Web3 = require('web3');
    console.log(Web3.version)

    const web3 = new Web3(
        new Web3.providers.HttpProvider('http://127.0.0.1:8545')
    );
    
    console.log(web3.eth)
    

    const [data, setData] = useState('');
    const [newData, setNewData] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const ContractURL = 'http://127.0.0.1:8545';
    const contractAddress = '0x9a3DBCa554e9f6b9257aAa24010DA8377C57c17e';
    const contractABI = [
        {
          inputs: [ [Object] ],
          name: 'updateData',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
          constant: undefined,
          payable: undefined,
          signature: '0x09e96008'
        },
        {
          inputs: [],
          name: 'readData',
          outputs: [ [Object] ],
          stateMutability: 'view',
          type: 'function',
          constant: true,
          payable: undefined,
          signature: '0xbef55ef3'
        }
      ];

    // This function sends a JSON-RPC call to read the data from the contract
    const readData = async () => {
        try {
            const web3 = new Web3(ContractURL);
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            const result = await contract.methods.readData().call();
            setData(result);
        } catch (error) {
            setErrorMessage('Error reading data from contract: ' + error.message);
        }
    };

    // This function sends a JSON-RPC call to write new data to the contract
    const updateData = async () => {
        try {
            const web3 = new Web3(ContractURL);
            const account = '0xfe3b557e8fb62b89f4916b721be55ceb828dbd73'; // Replace with your account address
            const privateKey = '0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63'; // Replace with your account private key
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            const tx = contract.methods.updateData(newData).send({ from: account, gas: 100000, gasPrice: '5000000000' });
            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
            await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            setNewData('');
            setData('Data updated successfully!');
        } catch (error) {
            setErrorMessage('Error updating data in contract: ' + error.message);
        }
    };

    return (
        <ScrollView>
            <View style={styles.text}>
                <Text>Current data: {data}</Text>
                <InputBox inputText={newData} setInputText={setNewData} />
                <Button style={styles.button} title="Update Data" onPress={updateData}>Update</Button>
                <Button style={styles.button} title="Read Data" onPress={readData}>Read</Button>
                {errorMessage !== '' && <Text style={styles.text}>{errorMessage}</Text>}
            </View>
        </ScrollView>
    );
};

export default SubmitVote;

const styles = StyleSheet.create({
    text: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    button: {
        marginTop: 60,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
        width: 250,
        height: 50,
        backgroundColor: 'purple',
        justifyContent: 'center',
        borderRadius: 15,
    },
})
