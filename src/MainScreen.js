// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainContext from './MainContext';
import { Container, Header, Left, Body, Title, Segment, Right, Content, Footer, FooterTab, Button } from 'native-base';

const MODE_PREDICT = 'predict';
const MODE_EXPAND = 'expand';

class MainScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: MODE_PREDICT
        };
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

    setMode(mode) {
        this.setState({ mode: mode });
    }

    render() {
        // const { someValue, actions: { someAction } } = this.props;
        const { mode } = this.state;
        
        return (
            <Container>
                <Header hasSegment>
                    <Left />
                    <Body>
                        <Title>Kiwi T9 App</Title>
                    </Body>
                    <Right />
                </Header>
                <Segment>
                    <Button first active={ mode == MODE_PREDICT } onPress={ () => this.setMode(MODE_PREDICT) }><Text>Predictions</Text></Button>
                    <Button last active={ mode == MODE_EXPAND } onPress={ () => this.setMode(MODE_EXPAND) }><Text>Expansions</Text></Button>
                </Segment>
                <Content>
                    <Text>
                        This is Content Section
                    </Text>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full>
                            <Text>Footer</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
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