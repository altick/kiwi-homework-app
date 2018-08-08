import React from 'react';
import renderer from 'react-test-renderer';
import { MainScreen, MODE_EXPAND, MODE_PREDICT } from './MainScreen';

let rendered: renderer.ReactTestRenderer = null;
let instance: MainScreen = null;

beforeEach(() => {
    rendered = renderer.create(<MainScreen />);
    instance = rendered.getInstance();
})

describe('Input mode', () => {

    it('Should set EXPAND mode', () => {
        instance.setMode(MODE_EXPAND);
        expect(instance.state.mode).toBe(MODE_EXPAND);
    });

    it('Should set PREDICT mode', () => {
        instance.setMode(MODE_PREDICT);
        expect(instance.state.mode).toBe(MODE_PREDICT);
    });

    describe('Set Mode - On click', () => {

        beforeEach(() => {
            instance.setMode = jest.fn();
            instance.updateExpansions = jest.fn();
        });

        it('Should set mode when clicked on set mode', () => {
            instance.onSetModeClick(MODE_PREDICT);
    
            expect(instance.setMode).toBeCalled();
        });
    
        it('Should update expansions when clicked on set mode', () => {
            instance.onSetModeClick(MODE_PREDICT);
    
            expect(instance.updateExpansions).toBeCalled();
        });

    });

});

