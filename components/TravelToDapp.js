// NavigationComponent.js
import React, { useContext } from 'react';
import { Linking } from 'react-native';
import DBAMEContext from './Context';
import CustomButton from './CustomButton';

const TravelToDapp = () => {
	const context = useContext(DBAMEContext);

	const handleNavigation = () => {
		if (context.votingClient) {
			Linking.openURL(context.votingClient).catch((err) => {
				console.error('Failed to open URL:', err);
			});
		}
	};

	return (
		<CustomButton onPress={handleNavigation} title="Go to Vote Submission " />
	);
};

export default TravelToDapp;
