import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyles from "../styles/global-styles";

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
      <View style={GlobalStyles.buttonsContainer}>
          <TouchableOpacity style={GlobalStyles.cancelButton} onPress={handleClearAll}>
            <Text style={GlobalStyles.buttonText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={GlobalStyles.okButton} onPress={handleGoBack}>
            <Text style={GlobalStyles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
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
});

export default LinkList;
