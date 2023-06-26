import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import ShareMenu from 'react-native-share-menu';

import LinkList from './src/screens/link-list';
import GlobalStyles from './src/styles/global-styles';
// @ts-ignore
import LinkPreview from 'react-native-link-preview';

const fetchPageTitle = async (url: any) => {
  try {
    const preview = await LinkPreview.getPreview(url);

    return preview.title || 'No title';
  } catch (error) {
    console.error('Error fetching page title:', error);
  }
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [sharedData, setSharedData] = React.useState({});
  const height = Dimensions.get('window').height;

  const handleShare = React.useCallback(async (item?: any) => {
    console.log('item: ', item);
    // share only url:
    if (!item || item.data[0].mimeType !== 'text/plain') {
      return;
    }

    try {
      const addLinkAndTitleToSharedData = async () => {
        const fullUrl = item.data[0].data;
        const linkMatch = fullUrl.match(/(https?:\/\/[^?]+)\?client/);
        const link = linkMatch && linkMatch[1] ? linkMatch[1] : fullUrl;
        const title = await fetchPageTitle(item.data[0].data);
        return {
          ...item.data[0],
          link,
          title,
        };
      };
      const newDataWithLinkAndTitle = await addLinkAndTitleToSharedData();
      setSharedData(newDataWithLinkAndTitle);
    } catch (error) {
      console.error('Error in handleShare:', error);
    }
  }, []);

  React.useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, [handleShare]);

  return (
    <SafeAreaView
      style={[
        GlobalStyles.appStyle,
        {
          height,
        },
      ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <LinkList
        isDarkMode={isDarkMode}
        fetchedLink={sharedData}
        height={height}
      />
    </SafeAreaView>
  );
};

export default App;
