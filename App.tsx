import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
// @ts-ignore
import ShareMenu, {ShareReceiveIntent} from 'react-native-share-menu';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//import {Colors} from 'react-native/Libraries/NewAppScreen';
import BottomSheet from './src/screens/bottom-sheet';
import LinkList from './src/screens/link-list';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const height = Dimensions.get('window').height;

  React.useEffect(() => {
    const handleShare = (item: ShareReceiveIntent) => {
      if (!item) return;

      const { mimeType, data, extraData } = item;
      console.log('data: ', data);
      console.log('item: ', item);
    };

    ShareMenu.getSharedText(handleShare);

    return () => {
      ShareMenu.clearSharedText();
    };
  }, []);

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: height,
  };

  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="black"
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            children={props => (
              <BottomSheet
                {...props}
                isDarkMode={isDarkMode}
                screenHeight={height}
              />
            )}
          />
          <Stack.Screen
            name="Links"
            options={{headerShown: false}}
            children={props => <LinkList {...props} isDarkMode={isDarkMode} />}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
