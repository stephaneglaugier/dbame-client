import { Button } from "react-native-paper";
import { StyleSheet, View } from 'react-native';


const Home = ({ navigation }) => {
    return (
        <View style={styles.text}>
            <Button
                style={styles.button}
                mode="contained"
                onPress={() =>
                    navigation.navigate('Get Election Parameters')
                }>Get Election Parameters </Button>
            <Button
                style={styles.button}
                mode="contained"
                onPress={() =>
                    navigation.navigate('Register To Vote')
                }>Register To Vote </Button>
            <Button
                style={styles.button}
                mode="contained"
                onPress={() =>
                    navigation.navigate('Request Ballot')
                }>Request Ballot </Button>
            <Button
                style={styles.button}
                mode="contained"
                onPress={() =>
                    navigation.navigate('Decrypt Ballot')
                }>Decrypt Ballot </Button>
            <Button
                style={styles.button}
                mode="contained"
                onPress={() =>
                    navigation.navigate('Vote')
                }>Vote </Button>
            <Button
                style={styles.button}
                mode="contained"
                onPress={() =>
                    navigation.navigate('Submit Vote')
                }>Submit Vote</Button>
        </View>

    );
};

export default Home;

const styles = StyleSheet.create({
    text: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    button: {
        marginTop: 60,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
        width: 250,
        height: 50,
        backgroundColor: 'purple',
        justifyContent: 'center',
        borderRadius: 15,
    },
})