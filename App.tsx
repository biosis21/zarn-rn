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
    const preview = LinkPreview.getPreview(url);

    console.log('preview:', preview);

    console.log('Page Title:', preview.title);

    return preview.title || 'No title';
  } catch (error) {
    console.error('Error fetching page title:', error);
  }
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const height = Dimensions.get('window').height;
  const [sharedData, setSharedData] = React.useState({});

  const handleShare = React.useCallback(async (item?: any) => {
    if (!item) return;
    try {
      const newData = await Promise.all(
        item.data.map(async (dataItem: {data: any}) => {
          const fullUrl = dataItem.data;
          const linkMatch = fullUrl.match(/(https?:\/\/[^?]+)\?client/);
          console.log('linkMatch: ', linkMatch);
          const link = linkMatch && linkMatch[1] ? linkMatch[1] : fullUrl;
          const title = await fetchPageTitle(link);
          return {
            ...dataItem,
            link,
            title,
          };
        }),
      );

      console.log('newData: ', newData);
      setSharedData(newData);
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
      <LinkList isDarkMode={isDarkMode} fetchedLink={sharedData} />
    </SafeAreaView>
  );
};

export default App;
