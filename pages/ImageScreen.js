import React, { useContext, useState } from 'react';
import { View, Image, StyleSheet, Text, Button, Modal, TouchableOpacity, Dimensions } from 'react-native';
import PhotoContext from '../contexts/PhotoContext';
import TattooContext from '../contexts/TattooContext';
import { Platform } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const ImageScreen = ({ navigation }) => {
  const { photoUri, setPhotoUri } = useContext(PhotoContext);
  const { tattooUri, setTattooUri } = useContext(TattooContext);

  // Create a state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  const [generatedUri, setGeneratedUri] = useState(null);  // The uri of the generated image

  const handleRetake = () => {
    setPhotoUri(null); // Clear the photo from the context
    navigation.navigate('Camera'); // Navigate back to the camera screen
  };

  const handleGenerate = async () => {
    const x = 60;
    const y = 163;
    const tattooWidth = 90;
    const tattooLength = 90;

    const armFileBase64 = await FileSystem.readAsStringAsync(photoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const requestData = {
      x: x ? x.toString() : '',
      y: y ? y.toString() : '',
      height: tattooWidth ? tattooWidth.toString() : '',
      width: tattooLength ? tattooLength.toString() : '',
      armFile: armFileBase64, // Send the base64 string instead of the file path
      tattooUri: tattooUri.uri,
    };

    try {
      const response = await axios.post('http://13.211.138.227/upload', requestData);
      console.log(response.data);
      // Set the generated image uri here
      setGeneratedUri(response.data.img);
      setModalVisible(true);  // Show the modal on successful image generation
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveImage = () => {
    // your save image logic here ...
    setModalVisible(false);
  };

  const handleBackToHome = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <>
          <Image source={{ uri: photoUri }} style={styles.image} />
          <View style={styles.buttonContainer}>
            <Button title="Retake" onPress={handleRetake} />
            <Button title="Generate Tattoo" onPress={handleGenerate} />
          </View>
        </>
      ) : (
        <Text>No image captured</Text>
      )}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)} activeOpacity={1}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Image source={{ uri: 'data:image/png;base64,' + generatedUri }} style={styles.finalImage} resizeMode="contain"/>
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveImage}>
                <Text style={styles.buttonText}>Save Image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleBackToHome}>
                <Text style={styles.buttonText}>Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 600,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute', // Here is the trick
    bottom: 0, // Here is the trick
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
    maxHeight: Dimensions.get('window').height * 0.8,  // Maximum height is 80% of the screen height
  },
  modalContent: {
    padding: 20,
  },
  finalImage: {
    height: 200,  // Or whatever size you want
    width: 100,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'red'
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ImageScreen;
