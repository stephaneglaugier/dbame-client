import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputBox = ({ name , inputText, setInputText}) => {

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setInputText(text)}
          value={inputText}
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

export default InputBox;
