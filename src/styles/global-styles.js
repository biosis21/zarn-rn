import {StyleSheet} from 'react-native';

const GlobalStyles = StyleSheet.create({
  appStyle: {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  },
  okButton: {
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
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: '40%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emptyListComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GlobalStyles;
