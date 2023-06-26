import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyles from "../styles/global-styles";
import RNBootSplash from "react-native-bootsplash";

const LinkList = (props) => {
  const {isDarkMode, fetchedLink, height} = props;
  const [links, setLinks] = useState([]);
  const backgroundColor = '#FFF';
  const textColor = '#333';

  const updateLinkList = async (newLink) => {
    try {
      console.log('newLink: ', newLink);
      const storedLinks = await AsyncStorage.getItem('links');
      let parsedLinks = storedLinks ? JSON.parse(storedLinks) : [];
      console.log('parsedLinks: ', parsedLinks);
      if (!newLink[0] || !newLink[0].link) {
        setLinks(parsedLinks);
        return;
      }
      const updatedLinks = [...parsedLinks, newLink[0]];
      await AsyncStorage.setItem('links', JSON.stringify(updatedLinks));
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

  const handleClearAll = async () => {
    setLinks([]);
    await AsyncStorage.setItem('links', JSON.stringify([]));
    await RNBootSplash.hide({ fade: true });
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
                <Text style={[styles.title, {color: textColor}]}>Title: {item?.title}</Text>
                <Text sstyle={[styles.link, {color: textColor}]}>Link: {item?.link}</Text>
              </View>
            )}
            ListEmptyComponent={
              <View style={[GlobalStyles.emptyListComponent, {height: height * 0.8}]}>
                <Text style={{color: textColor, fontSize: 24 }}>No links available</Text>
              </View>
            }
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
