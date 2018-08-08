import React from 'react';
import { Root } from 'native-base';

import MainStack from './src/MainStack';
import MainContext from './src/main/MainContext';
import SettingsContext from './src/settings/SettingsContext';

export default class App extends React.Component {
  render() {
    return (
      <SettingsContext.Provider>
        <MainContext.Provider>
          <Root>
            <MainStack />
          </Root>
        </MainContext.Provider>
      </SettingsContext.Provider>
    );
  }
}
