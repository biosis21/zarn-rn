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
import RNBootSplash from "react-native-bootsplash";

const LinkList = (props) => {
  const {isDarkMode, fetchedLink} = props;
  const [links, setLinks] = useState([]);
  const backgroundColor = isDarkMode ? '#333' : '#FFF';
  const textColor = isDarkMode ? '#FFF' : '#333';

  const updateLinkList = async (newLink) => {
    try {
      console.log('newLink: ', newLink);
      if (!newLink.link) return;
      const storedLinks = await AsyncStorage.getItem('links');
      let parsedLinks = storedLinks ? JSON.parse(storedLinks) : [];
      const updatedLinks = [...parsedLinks, newLink];
      await AsyncStorage.setItem('links', JSON.stringify(updatedLinks));
      console.log('updatedLinks: ', updatedLinks);
      setLinks(updatedLinks);
    } catch (error) {
      console.error('Error saving links to storage:', error);
    }
  }

  React.useEffect(() => {
    if (fetchedLink) {
      updateLinkList(fetchedLink);
    };
  }, [fetchedLink]);

  const handleClearAll = () => {
    setLinks([]);
    RNBootSplash.hide({ fade: true });
  };

  const handleGoBack = () => {
    RNBootSplash.hide({ fade: true });
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
