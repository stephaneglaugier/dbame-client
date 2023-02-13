import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InputBox from './InputBox';
import { Button, Text } from "react-native-paper";
import DoubleInputBox from './DoubleInputBox';
import { decode as atob, encode as btoa } from 'base-64'

const DecryptBallot = ({ navigation }) => {

    var bigInt = require("big-integer");
    var Buffer = require('buffer/').Buffer
    var aesjs = require("aes-js");

    const DEFAULT_RADIX = 16;
    const P = bigInt('6FA3', DEFAULT_RADIX);

    const [eBC1, setEBC1] = useState('5dde');
    const [eBC2, setEBC2] = useState('6e4a12d');
    const [encryptedBallot, setEncryptedBallot] = useState('ut5GUPwefaMqngqyQI9OdKgixd+1rXovtlqpSYksWIzHOVZI9MuRrzfpTGxQq2ew');
    const [ephemeralKey, setEphemeralKey] = useState('1ddb');
    const [privateKey, setPrivateKey] = useState('3039');

    const decryptBlindFactor = (_eBC1, _eBC2, _privateKey) => {
        const _eBC1BI = bigInt(_eBC1, DEFAULT_RADIX);
        const _eBC2BI = bigInt(_eBC2, DEFAULT_RADIX);
        const _privateKeyBI = bigInt(_privateKey, DEFAULT_RADIX);

        return _eBC2BI.mod(P).multiply(_eBC1BI.modPow(_privateKeyBI.negate(), P)).mod(P).toString(DEFAULT_RADIX);
    }

    const decryptEphemeralKey = (_ephemeralKey, _privateKey, _blindFactor) => {
        const _ephemeralKeyBI = bigInt(_ephemeralKey, DEFAULT_RADIX);
        const _privateKeyBI = bigInt(_privateKey, DEFAULT_RADIX);
        const _blindFactorBI = bigInt(_blindFactor, DEFAULT_RADIX);

        return _ephemeralKeyBI.modPow((_privateKeyBI.multiply(_blindFactorBI)), P).toString(DEFAULT_RADIX);
    }

    const decryptBallot = (_encryptionKey, _encryptedBallot) => {

        var _keyBytes = aesjs.utils.hex.toBytes(_encryptionKey);
        var _paddedKey = new Uint8Array(32);
        _paddedKey.set(new Uint8Array(_keyBytes));

        _decodedBallot = Buffer.from(_encryptedBallot, 'base64');

        // The initialization vector (must be 16 bytes)
        var iv = aesjs.utils.hex.toBytes("F27D5C9927726BCEFE7510B1BDD3D137");

        var aesCbc = new aesjs.ModeOfOperation.cbc(_paddedKey, iv);

        var decryptedBytes = aesCbc.decrypt(_decodedBallot);

        // Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes.slice(0, 32));

        return decryptedText;
    }

    const handleSubmit = () => {
        const blindFactor = decryptBlindFactor(eBC1, eBC2, privateKey);

        console.debug(blindFactor);

        const encryptionKey = decryptEphemeralKey(ephemeralKey, privateKey, blindFactor);

        console.debug(encryptionKey);

        const ballot = decryptBallot(encryptionKey, encryptedBallot);

        console.debug(ballot);

    }

    return (
        <ScrollView>
            <DoubleInputBox
                name={"Encrypted Blind Bactor"}
                inputText1={eBC1}
                setInputText1={setEBC1}
                inputText2={eBC2}
                setInputText2={setEBC2} />
            <InputBox
                name={"Encrypted Ballot"}
                inputText={encryptedBallot}
                setInputText={setEncryptedBallot} />
            <InputBox
                name={"Ephemeral Key:"}
                inputText={ephemeralKey}
                setInputText={setEphemeralKey} />
            <InputBox
                name={"Private Key"}
                inputText={privateKey}
                setInputText={setPrivateKey} />

            <Button style={styles.button} mode="contained" onPress={handleSubmit} >
                Request</Button>

        </ScrollView>
    );
};

export default DecryptBallot;

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
