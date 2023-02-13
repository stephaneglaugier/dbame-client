import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InputBox from './InputBox';
import { Button, Text } from "react-native-paper";
import DoubleInputBox from './DoubleInputBox';
import { decode as atob, encode as btoa } from 'base-64'
import DBAMEContext from './dbameContext';
import JSONText from './JSONText';


const DecryptBallot = ({ navigation }) => {

    const [result, setResult] = useState('');

    var bigInt = require("big-integer");
    var Buffer = require('buffer/').Buffer
    var aesjs = require("aes-js");

    const DEFAULT_RADIX = 16;
    const P = bigInt('6FA3', DEFAULT_RADIX);

    const context = React.useContext(DBAMEContext);

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
        const blindFactor = decryptBlindFactor(context.eBC1, context.eBC2, context.privateKey);

        const encryptionKey = decryptEphemeralKey(context.ephemeralKey, context.privateKey, blindFactor);

        const ballot = decryptBallot(encryptionKey, context.encryptedBallot);

        console.debug({blindFactor, encryptionKey, ballot});

        setResult(ballot);
    }

    return (
        <ScrollView>
            <DoubleInputBox
                name={"Encrypted Blind Bactor"}
                inputText1={context.eBC1}
                setInputText1={context.setEBC1}
                inputText2={context.eBC2}
                setInputText2={context.setEBC2} />
            <InputBox
                name={"Encrypted Ballot"}
                inputText={context.encryptedBallot}
                setInputText={context.setEncryptedBallot} />
            <InputBox
                name={"Ephemeral Key:"}
                inputText={context.ephemeralKey}
                setInputText={context.setEphemeralKey} />
            <InputBox
                name={"Private Key"}
                inputText={context.privateKey}
                setInputText={context.setPrivateKey} />

            <Button style={styles.button} mode="contained" onPress={handleSubmit} >
                Request</Button>

            <View style={styles.result}>
                <JSONText data={result} />
            </View>

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
    result: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30
    },
})
