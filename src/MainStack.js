// @flow

import { createStackNavigator } from 'react-navigation';
import MainScreenWithContext from './main/MainScreen';
import Setup from './Setup';

const MainStack = createStackNavigator({
    Setup: {
        screen: Setup
    },
    Main: {
        screen: MainScreenWithContext
    }
},
{
  initialRouteName: 'Setup',
  headerMode: 'none'
});

export default MainStack;