// @flow

import { createStackNavigator } from 'react-navigation';
import MainScreenWithContext from './main/MainScreen';
import Setup from './Setup';
import SettingsScreenWithContext from './settings/SettingsScreen';

const MainStack = createStackNavigator({
    Setup: {
        screen: Setup
    },
    Main: {
        screen: MainScreenWithContext
    },
    Settings: {
        screen: SettingsScreenWithContext
    }
},
{
  initialRouteName: 'Setup',
  headerMode: 'none'
});

export default MainStack;