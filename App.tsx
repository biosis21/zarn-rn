import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

//import {Colors} from 'react-native/Libraries/NewAppScreen';
import BottomSheet from './src/screens/bottom-sheet';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const height = Dimensions.get('window').height;

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: height,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="black"
      />
      <BottomSheet isDarkMode={isDarkMode} screenHeight={height} />
    </SafeAreaView>
  );
}

export default App;
