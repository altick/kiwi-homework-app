// @flow

import * as React from 'react';
import { AsyncStorage } from 'react-native';

export type AppSettings = {
    serverIpAddress: string
}

const defaultSettings: AppSettings = {
    serverIpAddress: 'localhost'
};

const InitialContextState = {
    isLoaded: false,
    ... defaultSettings,
    actions: {
        loadSettings: async () => {},
        saveSettings: async () => {},
    }
};

const { Consumer, Provider: ContextProvider } = React.createContext(InitialContextState);

class Provider extends React.Component {

    loadSettings = async () => {
        let data = await AsyncStorage.getItem('app:settings');
        
        let settings: AppSettings = data 
            ? JSON.parse(data)
            : defaultSettings;

        console.log(settings);

        this.setState({
            ... settings,
            isLoaded: true
        });
    }

    saveSettings = async(updatedSettings) => {
        let settings = { ...defaultSettings, ...updatedSettings };
        let data = JSON.stringify(settings);

        await AsyncStorage.setItem('app:settings', data);

        this.setState({
            ... updatedSettings
        });
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