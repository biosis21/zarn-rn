import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LinkList = ({ route, navigation, isDarkMode }) => {
  const [links, setLinks] = useState([]);
  const backgroundColor = isDarkMode ? '#333' : '#FFF';
  const textColor = isDarkMode ? '#FFF' : '#333';

  const updateLinkList = async (newLink) => {
    try {
      const storedLinks = await AsyncStorage.getItem('links');
      let parsedLinks = storedLinks ? JSON.parse(storedLinks) : [];
      const updatedLinks = [...parsedLinks, newLink];
      await AsyncStorage.setItem('links', JSON.stringify(updatedLinks));
      setLinks(updatedLinks);
    } catch (error) {
      console.error('Error saving links to storage:', error);
    }
  }

  React.useEffect(() => {
    if (route.params?.newLink) {
      updateLinkList(route.params?.newLink);
    };
  }, [route.params?.newLink]);

  const handleClearAll = () => {
    setLinks([]);
    AsyncStorage.removeItem('links');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <FlatList
        data={links}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.linkContainer}>
            <Text style={[styles.title, {color: textColor}]}>Title: {item.title}</Text>
            <Text sstyle={[styles.link, {color: textColor}]}>Link: {item.link}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
        <Text style={styles.buttonText}>Clear All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  linkContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
  },
  link: {
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LinkList;
