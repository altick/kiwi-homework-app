// @flow

import { createStackNavigator } from 'react-navigation';
import MainScreenWithContext from './MainScreen';

const MainStack = createStackNavigator({
    Main: {
        screen: MainScreenWithContext
    }
},
{
  initialRouteName: 'Main',
  headerMode: 'none'
});

export default MainStack;