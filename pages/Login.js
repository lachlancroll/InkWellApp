import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const width = windowWidth * 0.6;

const ButtonCustom = ({ onPress, title, buttonStyle }) => (
    <TouchableOpacity onPress={onPress} style={{ ...styles.button, ...buttonStyle }}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const LoginScreen = ({ navigation }) => {
    return (
        <LinearGradient colors={['rgb(10, 0, 40)', 'rgb(40, 0, 20)']} style={styles.container}>
            <Image
                style={{ ...styles.logo, width: width, height: width * 0.7 }}
                source={require('../images/inkwell-logo.png')}
                resizeMode="contain"
            />
            <View style={styles.buttonRow}>
                <ButtonCustom
                    title="Login"
                    buttonStyle={{ flex: 1 }}
                    onPress={() => {
                        // Perform login operation or navigate to login screen
                        // navigation.navigate('Login');
                    }}
                />
                <ButtonCustom
                    title="Sign Up"
                    buttonStyle={{ flex: 1 }}
                    onPress={() => {
                        // Perform sign up operation or navigate to sign up screen
                        // navigation.navigate('SignUp');
                    }}
                />
            </View>
            <ButtonCustom
                title="Continue as Guest"
                buttonStyle={{ width: '60%' }}
                onPress={() => {
                    navigation.navigate('Home');
                }}
            />

        </LinearGradient>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginBottom: 40,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '66%',
        marginBottom: 20,
    },
    button: {
        paddingHorizontal: 20,
        height: 50,
        backgroundColor: 'rgba(200, 200, 200, 0.8)',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'rgb(10, 0, 40)',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
