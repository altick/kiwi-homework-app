// @flow

import * as React from 'react';
import { AsyncStorage } from 'react-native';

const InitialContextState = {
    isLoaded: false,
    serverIpAddress: null,
    actions: {
        loadSettings: async () => {},
        saveSettings: async () => {},
    }
}

const { Consumer, Provider: ContextProvider } = React.createContext(InitialContextState);

class Provider extends React.Component {

    async loadSettings() {
        let data = await AsyncStorage.getItem('app:settings');
        let settings = JSON.parse(data);

        this.setState({
            ... settings,
            isLoaded: true
        });
    }

    async saveSettings() {
        let settings = {
            serverIpAddress: this.state.serverIpAddress
        };
        let data = JSON.stringify(settings);

        await AsyncStorage.setItem('app:string', data);
    }

    state = {
        ... InitialContextState,
        actions: {
            loadSettings: this.loadSettings,
            saveSettings: this.saveSettings
        }
    }

    render = () => (
        <ContextProvider value={this.state}>{ this.props.children }</ContextProvider>
    )
}

let SettingsContext = { Consumer, Provider };
export default SettingsContext;