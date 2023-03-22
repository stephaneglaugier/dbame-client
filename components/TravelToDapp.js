// NavigationComponent.js
import React, { useContext } from 'react';
import { TouchableOpacity, Text, Linking } from 'react-native';
import DBAMEContext from './Context';

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
    <TouchableOpacity onPress={handleNavigation} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
      <Text style={{ color: 'white', fontSize: 18 }}>Navigate to URL</Text>
    </TouchableOpacity>
  );
};

export default TravelToDapp;
