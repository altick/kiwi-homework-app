// @flow

import React from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import MainContext from './MainContext';
import { Container, Header, Left, Body, Title, Segment, Right, Content, Footer, FooterTab, Button, Item, Grid, Col, Row, Textarea, Spinner, Icon } from 'native-base';
import SettingsContext from '../settings/SettingsContext';

export const MODE_PREDICT = 'predict';
export const MODE_EXPAND = 'expand';

export class MainScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: MODE_PREDICT,
            input: '',
            numStr: '',
            expansions: [],
            selectedExpansion: ''
        };
    }

    async componentDidMount() {
        // this.props.actions.someAction('hello', 'World').then(() => {
        //     // this.props.navigation.push('Next Screen');
        // });
    }
    
    componentDidUpdate(prevProps, prevState) {
        const { numStr, mode } = this.state;

        if(prevState.mode != mode) {
            this.updateExpansions(numStr);
        }
    }

    async updateExpansions(numStr) {
        let expansions = [];
        
        try {
            switch(this.state.mode) {
                case MODE_EXPAND:
                expansions = await this.props.actions.getExpansions(numStr, this.props.settings);
                break;
                case MODE_PREDICT:
                expansions = await this.props.actions.getPredictions(numStr, this.props.settings);
                break;
            }
            
            console.log(expansions);

            this.setState({
                selectedExpansion: expansions.length ? expansions[0] : '',
                expansions: expansions
            });
        } catch(err) {
            Alert.alert(
                'Server not available',
                'Please, check whether you have connection to the same network the server is running on or update the server\'s IP address.',
                [
                  {text: 'Set IP address', onPress: () => this.onSettingsClick() },
                  {text: 'Dismiss', onPress: () => console.log('Dismissed')},
                ],
                { cancelable: false }
              )
        }
    }

    setMode(mode) {
        this.setState({ mode: mode });
    }

    clearExpansions() {
        this.setState({
            numStr: '',
            expansions: [],
            selectedExpansion: '',
        });
    }

    applySelectedExpansion() {
        const { selectedExpansion } = this.state;
        this.applyExpansion(selectedExpansion);
    }

    applyExpansion(expansion) {
        this.appendInput(expansion + ' ');

        this.clearExpansions();
    }

    appendInput(text) {
        const { input } = this.state;
        this.setState({
            input: input + text
        });
    }

    removeLastLetter() {
        const { input } = this.state;
        if(input.length == 0) {
            return;
        }

        this.clearExpansions();
        this.setState({
            input: input.substring(0, input.length - 1)
        });
    }

    async appendNumbericString(number) {
        let { numStr } = this.state;
        numStr = numStr + number;
        this.setState({
            numStr: numStr
        });
        await this.updateExpansions(numStr);
    }

    async removeLastNumber() {
        let { numStr } = this.state;
        if(numStr.length == 0) {
            return;
        }
        numStr = numStr.substring(0, numStr.length - 1);

        this.setState({
            numStr: numStr
        });
        await this.updateExpansions(numStr);
    }

    onKeyClick(number) {
        const { numStr } = this.state;
        switch(number) {
            case '0': {
                this.applySelectedExpansion();
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
            case '*':
            {
                this.selectPrevExpansion();
                break;
            }
            case '#':
            {
                this.selectNextExpansion();
                break;
            }
            default: {
                // do nothing
            }
        }
    }

    selectNextExpansion() {
        const { expansions, selectedExpansion } = this.state;

        let i = expansions.indexOf(selectedExpansion);
        if(i == -1 || i == expansions.length - 1) {
            return;
        }

        this.setState({
            selectedExpansion: expansions[i + 1]
        });
    }

    selectPrevExpansion() {
        const { expansions, selectedExpansion } = this.state;

        let i = expansions.indexOf(selectedExpansion);
        if(i == -1 || i == 0) {
            return;
        }

        this.setState({
            selectedExpansion: expansions[i - 1]
        });
    }

    onExpansionClick(index) {
        let expansion = this.state.expansions[index];

        this.applyExpansion(expansion);
    }
    
    onSettingsClick() {
        this.props.navigation.push('Settings');
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

    renderExpansions(expansions, selectedExpansion) {
        if(expansions.length == 0) {
            return (
                <Col style={ styles.expansionCotainer }><Button light full><Text>...</Text></Button></Col>
            );
        } else {
            return expansions.map((expansion, i) => (
                <Col key={i} style={ styles.expansionCotainer }>
                    <Button light full onPress={ () => this.onExpansionClick(i) }>
                        <Text style={ expansion == selectedExpansion ? styles.selectedExpansionText : styles.expansionText }>{ expansion }</Text>
                    </Button>
                </Col>
            ));
        }
    }

    render() {
        const { mode, input, expansions, selectedExpansion } = this.state;
        const { isLoading } = this.props;

        return (
            <Container>
                <Header hasSegment>
                    <Left />
                    <Body>
                        <Title>Kiwi homework</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={ () => this.onSettingsClick() }>
                            <Icon name="md-settings" type="Ionicons" />
                        </Button>
                    </Right>
                </Header>
                <Segment>
                    <Button first active={ mode == MODE_PREDICT } onPress={ () => this.setMode(MODE_PREDICT) } style={ Platform.OS == 'android' ? styles.segmentButton : {} }>
                        <Text style={ Platform.OS == 'android' ? (mode == MODE_PREDICT ? styles.segmentTextActive : styles.segmentText) : {} }>Predictions</Text>
                    </Button>
                    <Button last active={ mode == MODE_EXPAND } onPress={ () => this.setMode(MODE_EXPAND) } style={ Platform.OS == 'android' ? styles.segmentButton : {} }>
                        <Text style={ Platform.OS == 'android' ? (mode == MODE_EXPAND ? styles.segmentTextActive : styles.segmentText) : {} }>Expansions</Text>
                    </Button>
                </Segment>
                <Grid>
                    <Row style={ { flex: 2 } }>
                        <Col>
                            <Item full style={ styles.textArea }   style={ { flex: 1 } } >
                                <Textarea editable={false} rowSpan={3} value={ input + selectedExpansion + '_' }  style={ { flex: 1 } } />
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        { this.renderExpansions(expansions, selectedExpansion) }
                        { isLoading && <View style={ styles.expansionsLoader }><Spinner /></View> }
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
                        <Col>{ this.renderButton('*', '< prev')}</Col>
                        <Col>{ this.renderButton('0', '_')}</Col>
                        <Col>{ this.renderButton('#', 'next >')}</Col>
                    </Row>
                </Grid>
                <Footer>
                    <View style={ styles.footerContainer }>
                        <Text style={ styles.footerContent } >By Petr Altman</Text>
                    </View>
                </Footer>
            </Container>
        );
    }
}

let styles = StyleSheet.create({
    textArea: {
        padding: 5
    },
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
    },
    expansionCotainer: {
        zIndex: 1
    },
    expansionText: {

    },
    selectedExpansionText: {
        fontWeight: 'bold'
    },
    expansionsLoader: { 
        position: 'absolute', 
        left: 0, 
        top: -17, 
        zIndex: 10 
    },
    footerContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        backgroundColor: 'white' 
    },
    footerContent: { 
        fontSize: 12,
        textAlign: 'center', 
        color: 'lightgray' 
    },
    segmentButton: {
        padding: 15
    },
    segmentText: {
        color: 'white'
    },
    segmentTextActive: {
        color: 'blue'
    }
});

let MainScreenWithContext = props => (
    <SettingsContext.Consumer>
        {settings => (
            <MainContext.Consumer>
                {state => (
                    <MainScreen { ...props } {...state} settings={settings} ></MainScreen>
                ) }
            </MainContext.Consumer>
        )}
    </SettingsContext.Consumer>
);

export default MainScreenWithContext;