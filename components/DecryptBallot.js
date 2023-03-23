import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import InputBox from './InputBox';
import { Button, Text } from "react-native-paper";
import DoubleInputBox from './DoubleInputBox';
import { decode as atob, encode as btoa } from 'base-64'
import DBAMEContext from './Context';
import JSONText from './JSONText';
import globalStyles from '../globalStyles';
import CustomButton from './CustomButton';

const DecryptBallot = ({ navigation }) => {

    const [fullText, setFullText] = useState('');
    const [ballotId, setBallotId] = useState('');
    const [randInt, setRandInt] = useState('');
    const [timestamp, setTimeStamp] = useState('');

    var result = {
        fullText: fullText,
        ballotId: ballotId,
        randInt: randInt,
        timestamp: timestamp
    }

    var bigInt = require("big-integer");
    var Buffer = require('buffer/').Buffer
    var aesjs = require("aes-js");
    const TextEncodingPolyfill = require('text-encoding');


    const DEFAULT_RADIX = 16;

    const context = React.useContext(DBAMEContext);

    const decryptBlindFactor = (_eBC1, _eBC2, _privateKey) => {
        const _P = bigInt(context.p, DEFAULT_RADIX);
        const _eBC1BI = bigInt(_eBC1, DEFAULT_RADIX);
        const _eBC2BI = bigInt(_eBC2, DEFAULT_RADIX);
        const _privateKeyBI = bigInt(_privateKey, DEFAULT_RADIX);

        return _eBC2BI.mod(_P).multiply(_eBC1BI.modPow(_privateKeyBI.negate(), _P)).mod(_P).toString(DEFAULT_RADIX);
    }

    const decryptEphemeralKey = (_ephemeralKey, _privateKey, _blindFactor) => {
        const _P = bigInt(context.p, DEFAULT_RADIX);
        const _ephemeralKeyBI = bigInt(_ephemeralKey, DEFAULT_RADIX);
        const _privateKeyBI = bigInt(_privateKey, DEFAULT_RADIX);
        const _blindFactorBI = bigInt(_blindFactor, DEFAULT_RADIX);

        return _ephemeralKeyBI.modPow((_privateKeyBI.multiply(_blindFactorBI)), _P).toString(DEFAULT_RADIX);
    }

    const decryptBallot = (_encryptionKey, _encryptedBallot) => {

        const password = keyToPassword(_encryptionKey, 32);
        console.debug({ password: password.toString() });
        const _keyBytes = new TextEncodingPolyfill.TextEncoder().encode(password);
        console.debug({ _keyBytes: _keyBytes.toString() });

        _decodedBallot = Buffer.from(_encryptedBallot, 'base64');

        // The initialization vector (must be 16 bytes)
        var iv = aesjs.utils.hex.toBytes(context.iv);

        var aesCbc = new aesjs.ModeOfOperation.cbc(_keyBytes, iv);

        var decryptedBytes = aesCbc.decrypt(_decodedBallot);

        // Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes.slice(0, 32));

        return decryptedText;
    }

    const readBallot = (_ballot) => {
        const _a = _ballot.slice(0, 8);
        const _b = _ballot.slice(8, 16);
        const _c = _ballot.slice(16, 24);
        const _d = _ballot.slice(24);

        const id = parseInt(_a).toString();
        const date = new Date(parseInt(_b, DEFAULT_RADIX) * 1000);
        const randInt = parseInt(_c, DEFAULT_RADIX);

        setFullText(_ballot);
        setBallotId(id);
        setTimeStamp(date);
        setRandInt(randInt);
    }

    const handleSubmit = () => {
        const blindFactor = decryptBlindFactor(context.eBC1, context.eBC2, context.privateKey);

        const encryptionKey = decryptEphemeralKey(context.ephemeralKey, context.privateKey, blindFactor);

        const ballot = decryptBallot(encryptionKey, context.encryptedBallot);

        console.debug({ blindFactor, encryptionKey, ballot });

        readBallot(ballot);

        context.setBallot(ballot)

        console.debug(result);
    }

    const keyToPassword = (keyString, length) => {

        if (keyString.length < length) {
            const nZeros = length - keyString.length;
            let zeros = "";
            for (let i = 0; i < nZeros; i++) {
                zeros = zeros + "0";
            }
            keyString = zeros + keyString;
        } else if (keyString.length > length) {
            keyString = keyString.substring(keyString.length - 32);
        }

        if (keyString.length !== length) {
            throw new Error("Error when converting key to password.");
        }
        return keyString;
    }

    return (
        <ScrollView>
            <View style={globalStyles.container}>
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
                <CustomButton onPress={handleSubmit} title="Request" />
                <View style={globalStyles.result}>
                    <JSONText data={result} />
                </View>
            </View>
        </ScrollView>
    );
};

export default DecryptBallot;
