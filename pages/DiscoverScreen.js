import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions, Modal, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TattooContext from '../contexts/TattooContext';

const numColumns = 3;
const imageSize = Dimensions.get('window').width / numColumns;
const imageMargin = 5; // Define the space you want between the images
const size = imageSize - (numColumns * imageMargin);

const DiscoverPage = () => {
  const [data, setData] = useState(new Array(30).fill({ isEmpty: true, image: require('../images/empty-frame.png') }));
  const { setTattooUri } = useContext(TattooContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('ok')
    const newData = [...data];
    newData[0] = { isEmpty: false, image:{ uri: 'http://box5850.temp.domains/~crollme/images/tiger.png' } };
    setData(newData);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => !item.isEmpty ? handleImagePress(item) : null}>
        <Image style={styles.image} source={item.image} />
      </TouchableOpacity>
    </View>
  );

  const handleImagePress = (item) => {
    setSelectedImage(item);
    console.log(item.image)
    setTattooUri(item.image);
    setModalVisible(true);
  };

  const handleAddToSavedTattoos = () => {
    // Implement the logic to add the selected image to saved tattoos
    setModalVisible(false);
  };

  const handleTryOn = () => {
    // Navigate to the TryOnScreen
    navigation.navigate('BodyPartSelection', { selectedImage });
    setModalVisible(false);
  };

  const handleOverlayPress = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={handleOverlayPress} activeOpacity={1}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Options</Text>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddToSavedTattoos}>
                <Text style={styles.buttonText}>Add to Saved Tattoos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleTryOn}>
                <Text style={styles.buttonText}>Try On</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
};

export default DiscoverPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: imageMargin, // Add padding to the container
  },
  itemContainer: {
    width: size,
    height: size,
    margin: imageMargin, // Add margin to each image
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});