import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const DoubleInputBox = ({ name, inputText1, setInputText1, inputText2, setInputText2 }) => {

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setInputText1(text)}
          value={inputText1}
          padding={0}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setInputText2(text)}
          value={inputText2}
          padding={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginTop: 10,
  },
  input: {
    width: 250,
    height: 30
  },
});

export default DoubleInputBox;
