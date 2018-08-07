import React from 'react';
import MainContext from './src/MainContext';
import MainScreenWithContext from './src/MainScreen';
import { Font } from 'expo';
import { Text } from 'native-base';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false
    };
  }
  async componentWillMount() {
      await Font.loadAsync({
          'Roboto': require('./assets/Fonts/Roboto.ttf'),
          'Roboto_medium': require('./assets/Fonts/Roboto_medium.ttf'),
      });

      this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <MainContext.Provider>
        { this.state.fontLoaded 
          ? <MainScreenWithContext />
          : <Text>Loading...</Text>
        }
      </MainContext.Provider>
    );
  }
}
