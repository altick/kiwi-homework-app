// @flow

import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Font } from 'expo';
import SettingsContext from './settings/SettingsContext';
import { Spinner } from 'native-base';

class SetupComponent extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            isLoaded: false
        };
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Roboto': require('../assets/Fonts/Roboto.ttf'),
            'Roboto_medium': require('../assets/Fonts/Roboto_medium.ttf'),
        });

        await this.props.settings.actions.loadSettings();


        this.setState({ isLoaded: true });

        this.props.navigation.replace('Main');
    }

    async componentDidMount() {
        
    }
  
    render() {
        return (
            <View style={ styles.container }>
                <Spinner />
                <Text>Loading...</Text>
            </View>
        )
    }

}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
  
export default Startup = props => (
    <SettingsContext.Consumer>
        { settings => (
            <SetupComponent { ...props } 
                settings={ settings }
            ></SetupComponent>
        )}
    </SettingsContext.Consumer>
);