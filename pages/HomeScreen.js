import React, { useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from 'react-native';
import DiscoverScreen from './DiscoverScreen';
import AccountScreen from './AccountScreen';
import Constants from 'expo-constants';

const BottomToolbar = ({ navigate, activeIndex }) => (
  <View style={styles.toolbar}>
    <TouchableOpacity onPress={() => navigate(0)} style={activeIndex === 0 ? styles.activeButton : styles.button}>
      <Text style={styles.toolbarText}>Account</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigate(1)} style={activeIndex === 1 ? styles.activeButton : styles.button}>
      <Text style={styles.toolbarText}>Discover</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useCallback((index) => {
    swiperRef.current.scrollTo(index, true);
    setActiveIndex(index);
  }, []);

  return (
    <View style={styles.container}>
      <Swiper 
        ref={swiperRef} 
        showsButtons={false}
        showsPagination={false}
        loop={false} 
        onIndexChanged={setActiveIndex}
      >
        <AccountScreen />
        <DiscoverScreen />
      </Swiper>
      <BottomToolbar navigate={navigate} activeIndex={activeIndex} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  toolbar: {
    flexDirection: 'row',  // this makes the children of toolbar align horizontally
    height: 50,
    backgroundColor: 'rgb(40, 0, 20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6
  },
  activeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1
  },
  toolbarText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default HomeScreen;
