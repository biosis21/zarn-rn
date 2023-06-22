import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Button,
} from "react-native";

const BottomSheet = (props) => {
  const {isDarkMode, navigation, screenHeight } = props;
  const bottomSheetHeight = 250;
  const [isBottomSheetVisible, setBottomSheetVisible] = React.useState(false);
  const [sharedData, setSharedData] = React.useState({
    link: 'https://example.com',
    title: 'Example Page',
  });
  const animatedPosition = React.useRef(new Animated.Value(screenHeight)).current;

  console.log('height: ', screenHeight);
  const toggleBottomSheet = () => {
    Animated.timing(animatedPosition, {
      toValue: isBottomSheetVisible ? screenHeight : screenHeight * 0.7 - bottomSheetHeight,
      duration: 250,
      useNativeDriver: false,
    }).start();
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  const handleAddLink = () => {
    navigation.navigate('Links', {newLink: sharedData});
    toggleBottomSheet();
  };

  // const backgroundColor = isDarkMode ? '#333' : '#FFF';
  // const textColor = isDarkMode ? '#FFF' : '#333';

  return (
    <View style={[styles.container]}>
      <Button onPress={toggleBottomSheet} title={"Show Bottom"}/>
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height: bottomSheetHeight,
            transform: [{translateY: animatedPosition}],
            backgroundColor: 'gray',
          },
        ]}>
        <View style={styles.linkContainer}>
          <Text style={[styles.title, {color: 'white'}]}>
            Title: {sharedData.title}
          </Text>
          <Text style={[styles.link, {color: 'white'}]}>
            {sharedData.link}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={toggleBottomSheet}>
            <Text style={styles.cancelButtonText}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddLink}>
            <Text style={styles.buttonText}>
              Add Link
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 16,
    borderRadius: 8
  },
  linkContainer: {
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  link: {
    fontSize: 16,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: '40%',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BottomSheet;
