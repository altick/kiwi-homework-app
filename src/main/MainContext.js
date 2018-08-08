// @flow

import * as React from 'react';
import type { AppSettings } from '../settings/SettingsContext';


const InitialContextState = {
    isLoading: false,
    actions: {
        getExpansions: async () => {},
        getPredictions: async () => {},
    }
}

const { Consumer, Provider: ContextProvider } = React.createContext(InitialContextState);

class Provider extends React.Component {

    getExpansions = async (input, settings: AppSettings) => {
        console.log(`getting expansions for '${input}'`);
        if(input.length == 0) {
            return [];
        }

        this.setState({ isLoading: true });

        const url = `http://${ settings.serverIpAddress }:3000/expand/${ input }?limit=5`;
        console.log(url);
        let response = await fetch(url);
        if(!response.ok) {
            throw new Error('Couldn\'t fetch expansions');
        }
        let expansions = await response.json();

        this.setState({ isLoading: false });

        return expansions;
    }

    getPredictions = async (input, settings: AppSettings) => {
        console.log(`getting predictions for '${input}'`);
        if(input.length == 0) {
            return [];
        }
        
        this.setState({ isLoading: true });

        const url = `http://${ settings.serverIpAddress }:3000/predict/${ input }?limit=5`;
        console.log(url);
        let response = await fetch(url);
        if(!response.ok) {
            throw new Error('Couldn\'t fetch predictions');
        }
        let predictions = await response.json();

        this.setState({ isLoading: false });

        return predictions;
    }

    state = {
        ... InitialContextState,
        actions: {
            getExpansions: this.getExpansions,
            getPredictions: this.getPredictions
        }
    }

    render = () => (
        <ContextProvider value={this.state}>{ this.props.children }</ContextProvider>
    )
}

let MainContext = { Consumer, Provider };
export default MainContext;