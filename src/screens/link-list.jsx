import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  BackHandler,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyles from "../styles/global-styles";


const LinkList = (props) => {
  const {isDarkMode, fetchedLink, height} = props;
  const [links, setLinks] = useState([]);
  const backgroundColor = '#FFF';
  const textColor = '#333';
  const handleGoBack = () => {
    console.log('close');
    BackHandler.exitApp();
  };

  const updateLinkList = async (newLink) => {
    try {
      const storedLinks = await AsyncStorage.getItem('links');
      let parsedLinks = storedLinks ? JSON.parse(storedLinks) : [];
      if (!newLink || !newLink.link) {
        setLinks(parsedLinks);
        return;
      }
      const updatedLinks = [...parsedLinks, newLink];
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

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleGoBack
    );

    return () => backHandler.remove();
  }, []);

    const handleClearAll = async () => {
      setLinks([]);
      await AsyncStorage.setItem('links', JSON.stringify([]));
      handleGoBack();
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
