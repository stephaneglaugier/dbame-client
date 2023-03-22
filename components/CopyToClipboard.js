import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Clipboard } from 'react-native';
import PropTypes from 'prop-types';

const CopyToClipboard = ({ textToCopy }) => {

  const handleCopyToClipboard = async () => {
    await Clipboard.setString(textToCopy);
    alert('Copied to clipboard!');
  };

  return (
    <View>
      <TouchableOpacity onPress={handleCopyToClipboard} style={styles.button}>
        <Text style={{ color: 'black', textAlign: 'center' }}>Copy to Clipboard</Text>
      </TouchableOpacity>
    </View>
  );
};

CopyToClipboard.propTypes = {
  textToCopy: PropTypes.string.isRequired
};

export default CopyToClipboard;


const styles = StyleSheet.create({
    button: {
        marginTop: 30,
        marginLeft: 50,
        marginRight: 50,
        alignItems: 'center'
    }
})