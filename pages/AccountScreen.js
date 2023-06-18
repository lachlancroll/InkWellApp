import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const AccountScreen = () => {
  const [activeSections, setActiveSections] = useState([]);
  const categories = [
    { title: 'Saved Photos', content: 'List of saved photos' },
    { title: 'Saved Tattoos', content: 'List of saved tattoos' },
    { title: 'Your Tattoos', content: 'List of your tattoos' },
  ];

  const renderHeader = (section, _, isActive) => {
    return (
      <View style={isActive ? styles.activeHeader : styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <View style={isActive ? styles.activeContent : styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.profilePicContainer}>
          <Image
            style={styles.profilePic}
            source={require('../images/blank-profile-circle.png')}
            resizeMode={'cover'}
          />
        </View>
        <View>
          <Text style={styles.userName}>Custom Name</Text>
          <Text style={styles.usernameText}>username</Text>
        </View>
      </View>
      <Accordion
        sections={categories}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={setActiveSections}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
  },
  profilePicContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden', // Make sure the image doesn't overflow the circular frame
  },
  profilePic: {
    width: 81,
    height: 81,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 30,
  },
  usernameText: {
    fontSize: 16,
    color: 'gray',
    paddingLeft: 30,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeHeader: {
    backgroundColor: '#E3F2FD',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  activeContent: {
    padding: 20,
    backgroundColor: '#E3F2FD',
  },
});

export default AccountScreen;
