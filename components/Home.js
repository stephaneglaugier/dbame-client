import React from 'react';
import { View } from 'react-native';
import CustomButton from './CustomButton';
import globalStyles from "../globalStyles";

const Home = ({ navigation }) => {
	return (
		<View style={globalStyles.container}>
			<CustomButton
				onPress={() => navigation.navigate('Get Election Parameters')}
				title="Get Election Parameters"
			/>
			<CustomButton
				onPress={() => navigation.navigate('Register To Vote')}
				title="Register To Vote"
			/>
			<CustomButton
				onPress={() => navigation.navigate('Request Ballot')}
				title="Request Ballot"
			/>
			<CustomButton
				onPress={() => navigation.navigate('Decrypt Ballot')}
				title="Decrypt Ballot"
			/>
			<CustomButton
				onPress={() => navigation.navigate('Vote')}
				title="Vote"
			/>
			<CustomButton
				onPress={() => navigation.navigate('Encrypt Vote')}
				title="Encrypt Vote"
			/>
		</View>
	);
};

export default Home;
