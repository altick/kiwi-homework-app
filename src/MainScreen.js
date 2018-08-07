// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainContext from './MainContext';
import { Container, Header, Left, Body, Title, Segment, Right, Content, Footer, FooterTab, Button, Item, Input, Grid, Col, Row } from 'native-base';

const MODE_PREDICT = 'predict';
const MODE_EXPAND = 'expand';

class MainScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: MODE_PREDICT,
            input: '',
            numStr: ''
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

    appendInput(text) {
        const { input } = this.state;
        this.setState({
            input: input + text
        });
    }

    appendNumbericString(number) {
        const { numStr } = this.state;
        this.setState({
            numStr: numStr + number
        });
    }

    removeLastLetter() {
        const { input } = this.state;
        if(input.length == 0) {
            return;
        }
        this.setState({
            input: input.substring(0, input.length - 1)
        });
    }

    removeLastNumber() {
        const { numStr } = this.state;
        if(numStr.length == 0) {
            return;
        }
        this.setState({
            numStr: numStr.substring(0, numStr.length - 1)
        });
    }

    appendSpace() {
        const { numStr } = this.state;
        this.appendInput(numStr + ' ');

        this.setState({
            numStr: ''
        });
    }

    onKeyClick(number) {
        const { numStr } = this.state;
        switch(number) {
            case '0': {
                this.appendSpace();
                break;
            }
            case '1': {
                if(numStr.length) {
                    this.removeLastNumber();
                } else {
                    this.removeLastLetter();
                }
                break;
            }
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            {
                this.appendNumbericString(number);
                break;
            }
            default: {
                // do nothing
            }
        }
    }

    renderButton(number, letters) {
        return (
            <Button full large rounded light style={ styles.keyboardButton } onPress={ () => this.onKeyClick(number) }>
                <View>
                    <Text style={ styles.keyNumber }>{ number }</Text>
                    <Text style={ styles.keyLetters }>{ letters }</Text>
                </View>
            </Button>
        );
    }

    render() {
        // const { someValue, actions: { someAction } } = this.props;
        const { mode, input, numStr } = this.state;
        
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
                    <Grid>
                        <Row>
                            <Col>
                                <Item full rounded>
                                    <Input placeholder='Input' value={ input + numStr + '_' }/>
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>{ this.renderButton('1', '< C')}</Col>
                            <Col>{ this.renderButton('2', 'abc')}</Col>
                            <Col>{ this.renderButton('3', 'def')}</Col>
                        </Row>
                        <Row>
                            <Col>{ this.renderButton('4', 'ghi')}</Col>
                            <Col>{ this.renderButton('5', 'jkl')}</Col>
                            <Col>{ this.renderButton('6', 'mno')}</Col>
                        </Row>
                        <Row>
                            <Col>{ this.renderButton('7', 'pqrs')}</Col>
                            <Col>{ this.renderButton('8', 'tuv')}</Col>
                            <Col>{ this.renderButton('9', 'wxyz')}</Col>
                        </Row>
                        <Row>
                            <Col>{ this.renderButton('#', '')}</Col>
                            <Col>{ this.renderButton('0', '_')}</Col>
                            <Col>{ this.renderButton('*', '')}</Col>
                        </Row>
                    </Grid>
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
    keyboardButton: {
        padding: 20,
        margin: 4
    },
    keyNumber: {
        fontSize: 20,
        textAlign: 'center'
    },
    keyLetters: {
        fontSize: 12,
        textAlign: 'center'
    }


});

let MainScreenWithContext = props => (
    <MainContext.Consumer>
        {state => (
            <MainScreen { ...props } {...state} ></MainScreen>
        ) }
    </MainContext.Consumer>
);

export default MainScreenWithContext;