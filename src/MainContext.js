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

        return ['hello', 'world', 'today'];
    }

    getPredictions = async (input) => {
        console.log(`getting expansions for '${input}'`);
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