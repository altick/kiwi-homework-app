// @flow

import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Button, Body, Title, Icon, Left, Fab, Form, Right, Item, Input, Label } from 'native-base';
import SettingsContext from './SettingsContext';

import type { AppSettings } from './SettingsContext';

class SettingsScreen extends React.Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            ipAddress: props.settings.serverIpAddress
        };
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        // Previous SomeContext value is prevProps.someValue
        // New SomeContext value is this.props.someValue
    }

    async save() {
        let newSettings: AppSettings = {
            serverIpAddress: this.state.ipAddress
        }

        await this.props.settings.actions.saveSettings(newSettings);

        this.navigateBack();
    }

    navigateBack() {
        this.props.navigation.pop()
    }

    render() {
        const { navigation } = this.props;
        
        const list = navigation.getParam('list');

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={ () => this.navigateBack() }>
                            <Icon name='arrow-left' type="MaterialCommunityIcons" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Settings</Title>
                    </Body>
                    <Right>
                        <Button transparent light onPress={ () => this.save() }>
                            <Text style={ { color: 'white' } }>Save</Text><Icon name='check' type="MaterialCommunityIcons" />
                        </Button>
                    </Right>
                </Header>
                <View style={{ flex: 1 }}>
                    <Content>
                        <Form>
                            <Item floatingLabel>
                                <Label>Server IP address (e.g. 192.168.0.1:1234)</Label>
                                <Input
                                    value={ this.state.ipAddress } 
                                    onChangeText={(ipAddress) => this.setState({ ipAddress })}
                                />
                            </Item>
                        </Form>
                    </Content>
                </View>
            </Container>
        );
    }
}

let styles = StyleSheet.create({
    
});

let SettingsScreenWithContext = props => (
    <SettingsContext.Consumer>
        {settings => (
            <SettingsScreen { ...props } settings={ settings }></SettingsScreen>
        )}
    </SettingsContext.Consumer>
);
export default SettingsScreenWithContext;