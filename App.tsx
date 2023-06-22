import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//import {Colors} from 'react-native/Libraries/NewAppScreen';
import BottomSheet from './src/screens/bottom-sheet';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const height = Dimensions.get('window').height;

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: height,
  };

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="black"
          />
          <Stack.Screen
            name="Home"
            children={props => (
              <BottomSheet
                {...props}
                isDarkMode={isDarkMode}
                screenHeight={height}
              />
            )}
          />
        </SafeAreaView>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
