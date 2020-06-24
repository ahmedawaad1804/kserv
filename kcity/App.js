import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

/*screens */
import Navigation from './containers/Navigation/Navigation'
/* redux */
import { Provider } from 'react-redux'
import store from './store'
/* colors */
import colors from './colors'
/* fonts */
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'Cairo-Bold': require('./assets/fonts/Cairo-Bold.ttf'),
    'Cairo-Regular': require('./assets/fonts/Cairo-Regular.ttf'),

  });
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false
    };
  }
  render() {
    if (!this.state.dataLoaded) {
      return (

        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => { this.setState({ dataLoaded: true }) }}
        />

      )
    }
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.primary}
          barStyle="light-content"
        />
        <Provider store={store}>
          <Navigation />
        </Provider>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
