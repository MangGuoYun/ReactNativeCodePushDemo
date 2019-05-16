/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppState} from 'react-native';
import codePush from 'react-native-code-push'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  checkUpdate() {
    // codePush.sync({
    //   updateDialog: {
    //     appendReleaseDescription: true,
    //     descriptionPrefix:'',
    //     title:'新版本更新',
    //     optionalIgnoreButtonLabel:'不用',
    //     optionalInstallButtonLabel:'更新',
    //     optionalUpdateMessage:''
    //   },
    // });
    codePush.checkForUpdate()
    .then((update) => {
        if (!update) {
            console.warn("The app is up to date!");
        } else {
            console.warn("An update is available! Should we download it?");
            codePush.getUpdateMetadata().then((update) => {
              console.warn('update:',JSON.stringify(update));
            });
        }
    });
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.checkUpdate();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this.checkUpdate();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

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
});
