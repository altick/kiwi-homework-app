// @flow

import * as React from 'react';

const InitialContextState = {
    actions: {
        getExpansions: async () => {},
        getPredictions: async () => {},
    }
}

const { Consumer, Provider: ContextProvider } = React.createContext(InitialContextState);

class Provider extends React.Component {

    getExpansions = async (input) => {
        console.log(`getting expansions for '${input}'`);
        if(input.length == 0) {
            return [];
        }

        let response = await fetch(`http://192.168.0.164:3000/expand/${input}?limit=5`);
        if(!response.ok) {
            throw new Error('Couldn\'t fetch expansions');
        }
        let expansions = await response.json();

        return expansions;
    }

    getPredictions = async (input) => {
        console.log(`getting predictions for '${input}'`);
        if(input.length == 0) {
            return [];
        }

        let response = await fetch(`http://192.168.0.164:3000/predict/${input}?limit=5`);
        if(!response.ok) {
            throw new Error('Couldn\'t fetch predictions');
        }
        let predictions = await response.json();

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