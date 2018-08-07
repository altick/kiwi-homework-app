import React from 'react';
import { StyleSheet } from 'react-native';
import MainContext from './src/MainContext';
import MainScreenWithContext from './src/MainScreen';

export default class App extends React.Component {
  render() {
    return (
      <MainContext.Provider>
        <MainScreenWithContext />
      </MainContext.Provider>
    );
  }
}
