import React, { useContext, useState } from 'react';
import { View, Image, StyleSheet, Text, Button, Modal, TouchableOpacity, Dimensions } from 'react-native';
import PhotoContext from '../contexts/PhotoContext';
import TattooContext from '../contexts/TattooContext';
import { Platform } from 'react-native';
import axios from 'axios';

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
    const formData = new FormData();

    const armFile = {
      uri: Platform.OS === 'android' ? photoUri : photoUri.replace('file://', ''),
      type: 'image/jpeg',
      name: 'arm.jpg',
    };
    formData.append('arm_file', armFile);

    // Since tattooUri is a URL, you can send it as a string.
    formData.append('tattooUri', tattooUri.uri.replace('10.0.2.2', 'localhost'));

    formData.append('x', x ? x.toString() : '');
    formData.append('y', y ? y.toString() : '');
    formData.append('height', tattooWidth ? tattooWidth.toString() : '');
    formData.append('width', tattooLength ? tattooLength.toString() : '');

    try {
      const response = await axios.post('http://10.0.2.2:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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
              <Image source={{ uri: generatedUri }} style={styles.finalImage} />
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
    width: '100%',
    height: 200,  // Or whatever size you want
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
