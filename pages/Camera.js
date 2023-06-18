import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import PhotoContext from '../contexts/PhotoContext';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
    const { setPhotoUri } = useContext(PhotoContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [ratio, setRatio] = useState('4:3');
    const cameraRef = useRef(null);
    const navigation = useNavigation();

    const getSupportedRatios = async () => {
        const ratios = await cameraRef.current.getSupportedRatiosAsync();
        console.log('Supported Ratios: ', ratios);
        if (ratios.includes('4:3')) {
            setRatio('4:3');
        } else if (ratios.length) {
            setRatio(ratios[ratios.length - 1]);
        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            if (status === 'granted') {
                getSupportedRatios();
            }
        })();
    }, []);

    const flipCamera = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            let photo = await cameraRef.current.takePictureAsync();
            // Save the photo URI in the context:
            console.log(photo)
            setPhotoUri(photo.uri);
            Alert.alert('Photo captured!');
            navigation.navigate('Image');
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef} ratio={ratio}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={flipCamera} style={styles.flipButton}>
                        <MaterialIcons name="flip-camera-ios" size={36} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                        <MaterialIcons name="camera" size={70} color="white" />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        margin: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    flipButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        padding: 10,
    },
    captureButton: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: 20,
    },
});

export default CameraScreen;