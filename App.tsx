import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import ShareMenu from 'react-native-share-menu';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//import {Colors} from 'react-native/Libraries/NewAppScreen';
import BottomSheet from './src/screens/bottom-sheet';
import LinkList from './src/screens/link-list';
import GlobalStyles from './src/styles/global-styles';

// type SharedItem = {
//   mimeType: string;
//   data: string;
// };

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const height = Dimensions.get('window').height;

  const handleShare = React.useCallback((item?: any) => {
    // if (!item) return;
    // const { mimeType, data, extraData } = item;
    // console.log('data: ', data);
    console.log('item: ', item);
  }, []);

  React.useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, [handleShare]);

  const Stack = createStackNavigator();

  return (
    <SafeAreaView
      style={[
        GlobalStyles.appStyle,
        {
          height,
        },
      ]}>
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
