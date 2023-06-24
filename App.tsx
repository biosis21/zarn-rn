import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
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
  const [sharedData, setSharedData] = React.useState('');
  const [sharedMimeType, setSharedMimeType] = React.useState('');

  const handleShare = React.useCallback((item?: any) => {
    console.log('item: ', item);
    console.log('item.data[0].data: ', item.data[0].data);
    const {mimeType, data, extraData} = item.data[0];

    setSharedData(data);
    setSharedExtraData(extraData);
    setSharedMimeType(mimeType);
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
        // backgroundColor="black"
      />
      <Text style={styles.welcome}>React Native Share Menu</Text>
      <Text style={styles.instructions}>Shared type: {sharedMimeType}</Text>
      <Text style={styles.instructions}>
        Shared text: {sharedMimeType === 'text/plain' ? sharedData : ''}
      </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default App;
