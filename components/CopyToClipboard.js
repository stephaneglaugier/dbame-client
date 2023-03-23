import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import globalStyles from '../globalStyles';
import CustomButton from './CustomButton';

const CopyToClipboard = ({ textToCopy }) => {

	const handleCopyToClipboard = async () => {
		await Clipboard.setString(textToCopy);
		// alert('Copied to clipboard!');
	};

	return (
		<CustomButton onPress={handleCopyToClipboard} title="Copy to Clipboard" />
	);
};

CopyToClipboard.propTypes = {
	textToCopy: PropTypes.string.isRequired
};

export default CopyToClipboard;
