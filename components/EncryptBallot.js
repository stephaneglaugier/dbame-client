import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Clipboard } from 'react-native';
import InputBox from './InputBox';
import { Button, Text } from "react-native-paper";
import DBAMEContext from './Context';
import JSONText from './JSONText';
import CopyToClipboard from './CopyToClipboard';
import TravelToDapp from './TravelToDapp';

const EncryptBallot = ({ navigation }) => {

    const context = React.useContext(DBAMEContext);

    const [c3, setC3] = useState('');
    const [c4, setC4] = useState('');

    var bigInt = require("big-integer");

    const DEFAULT_RADIX = 16;

    const encryptBallot = () => {
        const _P = bigInt(context.p, DEFAULT_RADIX);
        const _G = bigInt(context.g, DEFAULT_RADIX);
        const _BALLOT = bigInt(context.ballot, DEFAULT_RADIX);
        const _V = bigInt.randBetween(0, _P.minus(bigInt.one));
        const _yR = bigInt(context.yR, DEFAULT_RADIX);
        const _yM = bigInt(context.yM, DEFAULT_RADIX);

        if (_BALLOT.greaterOrEquals(_P)) {
            throw new Error("Ballot cannot be greater than p");
        }

        // const variables = { _P, _G, _BALLOT, _V, _yR, _yM };
        // for (const [name, value] of Object.entries(variables)) {
        //     console.debug(`${name}: ${value.toString(DEFAULT_RADIX)}`);
        // }

        const _c3 = _G.modPow(_V, _P);

        const _product = _yR.multiply(_yM);
        const _exponentiated = _product.modPow(_V, _P);
        const _c4 = _BALLOT.multiply(_exponentiated).mod(_P);

        return { _c3: _c3.toString(DEFAULT_RADIX), _c4: _c4.toString(DEFAULT_RADIX) }
    }

    const decryptBallot = (c3, c4, xm, xr) => {
        const _P = bigInt(context.p, DEFAULT_RADIX);
        const _xm = bigInt(xm, DEFAULT_RADIX);
        const _xr = bigInt(xr, DEFAULT_RADIX);
        const _C3 = bigInt(c3, DEFAULT_RADIX);
        const _C4 = bigInt(c4, DEFAULT_RADIX);

        // const variables = { _P, _xm, _xr, _C3, _C4 };
        // for (const [name, value] of Object.entries(variables)) {
        //     console.debug(`${name}: ${value.toString(DEFAULT_RADIX)}`);
        // }

        const c3_inverse_xm = _C3.modPow(_xm.negate(), _P);
        const c3_inverse_xr = _C3.modPow(_xr.negate(), _P);

        const product = c3_inverse_xm.multiply(c3_inverse_xr).mod(_P);

        const _BALLOT = _C4.multiply(product).mod(_P);

        return { ballot: _BALLOT.toString(DEFAULT_RADIX) };
    }

    const handleSubmit = () => {

        const { _c3, _c4 } = encryptBallot();
        setC3(_c3);
        setC4(_c4);
        console.log({ _c3, _c4 });
    }

    return (
        <ScrollView>
            <View style={styles.text}>
                <InputBox inputText={context.ballot} setInputText={context.setBallot} />
                <Button style={styles.button} mode="contained" onPress={handleSubmit} >
                    Encrypt</Button>
                <View style={styles.result}>
                    <JSONText data={{ c3, c4 }} />
                </View>
                <View style={styles.result}>
                    <CopyToClipboard textToCopy={JSON.stringify({ c3, c4 })} />
                </View>
                <View style={styles.result}>
                    <TravelToDapp />
                </View>


            </View>

        </ScrollView>
    );
};

export default EncryptBallot;

const styles = StyleSheet.create({
    text: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
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
    }
})
