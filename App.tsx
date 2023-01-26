import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import RegisterForm from './components/RegisterForm';
import RegisterToVote from './components/RegisterToVotePOST';



const App = () => {
  return (
    <ScrollView>
      <View style={{ paddingTop: 50, paddingBottom: 50, paddingLeft: 20, paddingRight: 20 }}>
        <View style={styles.center}>
          <Text>Hello and welcome to d-BAME!</Text>
        </View>
        <RegisterForm />
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  }
});