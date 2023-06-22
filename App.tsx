import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

//import {Colors} from 'react-native/Libraries/NewAppScreen';
import BottomSheet from './src/screens/bottom-sheet';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const height = Dimensions.get('window').height;

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: height,
  };

  // const Stack = createStackNavigator();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="black"
      />
      <BottomSheet isDarkMode={isDarkMode} screenHeight={height} />
      {/*<NavigationContainer>*/}
      {/*  <Stack.Navigator initialRouteName="Home">*/}
      {/*    <Stack.Screen*/}
      {/*      name="Home"*/}
      {/*      children={props => (*/}
      {/*        <BottomSheet*/}
      {/*          {...props}*/}
      {/*          isDarkMode={isDarkMode}*/}
      {/*          screenHeight={height}*/}
      {/*        />*/}
      {/*      )}*/}
      {/*    />*/}
      {/*  </Stack.Navigator>*/}
      {/*</NavigationContainer>*/}
    </SafeAreaView>
  );
}

export default App;
