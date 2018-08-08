import React from 'react';
import { Font } from 'expo';
import { Text } from 'native-base';

import MainStack from './src/MainStack';
import MainContext from './src/main/MainContext';

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
    if(!this.state.fontLoaded) {
      return <Text>Loading...</Text>;
    }

    return (
      <MainContext.Provider>
        <MainStack />
      </MainContext.Provider>
    );
  }
}
