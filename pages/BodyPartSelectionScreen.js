import React, { useState, useEffect, useContext } from 'react';
import { View, Image, PanResponder, Animated, StyleSheet, Button } from 'react-native';
import arm from '../images/bodyParts/arm.png';
import { useNavigation } from '@react-navigation/native';
import TattooContext from '../contexts/TattooContext'; // Import your context

const BodyPartSelectionScreen = ({ route }) => {
  const { tattooUri, setTattooUri } = useContext(TattooContext); // Use the context
  const { setX, setY } = route.params;
  const [startX, setStartX] = useState();
  const [startY, setStartY] = useState();
  const [draggableImage, setDraggableImage] = useState(null);
  const pan = useState(new Animated.ValueXY())[0];
  const navigation = useNavigation();

  useEffect(() => {
    console.log(tattooUri)
    tattooUri ? setDraggableImage({uri: tattooUri}) : null; // use the tattooUri from the context
  }, [tattooUri]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      // record the initial touch point
      pan.x.setOffset(pan.x._value);
      pan.y.setOffset(pan.y._value);
      pan.x.setValue(0);
      pan.y.setValue(0);
      setStartX(pan.x._offset)
      setStartY(pan.y._offset)
    },
    onPanResponderMove: (e, gestureState) => {
      let dx = gestureState.dx;
      let dy = gestureState.dy;

      yLowerBound = 200;
      yUpperBound = 0;
      xLowerBound = 30;
      xUpperBound = -10;
      if (dy > (yLowerBound - startY)) {
        dy = (yLowerBound - startY);
      } else if (dy < (yUpperBound - startY)) {
        dy = (yUpperBound - startY);
      }
      if (dx > (xLowerBound - startX)) {
        dx = (xLowerBound - startX);
      } else if (dx < (xUpperBound - startX)) {
        dx = (xUpperBound - startX);
      }
      pan.x.setValue(dx);
      pan.y.setValue(dy);
    },
    onPanResponderRelease: () => {
      pan.x.flattenOffset();
      pan.y.flattenOffset();
    },
  });

  const handleNext = () => {
    // Implement the logic for the "Next" button here
    // This function will be called when the button is pressed
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={arm} />
      <Animated.Image
        {...panResponder.panHandlers}
        style={[styles.draggableImage, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
        source={draggableImage?.uri}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={handleNext} title="Next" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: 270,
    height: 480,
  },
  draggableImage: {
    position: 'absolute',
    width: 90,
    height: 90,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
  },
});

export default BodyPartSelectionScreen;
