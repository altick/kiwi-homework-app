import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainContext from './MainContext';


class MainScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        // this.props.actions.someAction('hello', 'World').then(() => {
        //     // this.props.navigation.push('Next Screen');
        // });
    }
    
    componentDidUpdate(prevProps, prevState) {
        // Previous SomeContext value is prevProps.someValue
        // New SomeContext value is this.props.someValue
      }

    render() {
        // const { someValue, actions: { someAction } } = this.props;
        
        return (
            <View>
                <Text>Hello</Text>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    
});

let MainScreenWithContext = props => (
    <MainContext.Consumer>
        {state => (
            <MainScreen { ...props } {...state} ></MainScreen>
        ) }
    </MainContext.Consumer>
);

export default MainScreenWithContext;