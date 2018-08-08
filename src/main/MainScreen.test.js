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

    describe('Set Mode', () => {

        it('Should set EXPAND mode', () => {
            instance.setMode(MODE_EXPAND);
            expect(instance.state.mode).toBe(MODE_EXPAND);
        });

        it('Should set PREDICT mode', () => {
            instance.setMode(MODE_PREDICT);
            expect(instance.state.mode).toBe(MODE_PREDICT);
        });

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

describe('Numeric string', () => {

    beforeEach(() => {
        instance.updateExpansions = jest.fn();
    });

    describe('Appending number to numeric string', () => {

        it('Should contain single number after appending number at inital state', async () => {
            expect.assertions(1);
    
            await instance.appendNumbericString('8');
    
            expect(instance.state.numStr).toBe('8');
        });
    
        it('Should append number to current numeric string', async () => {
            expect.assertions(1);
    
            instance.state.numStr = '123';
    
            await instance.appendNumbericString('8');
    
            expect(instance.state.numStr).toBe('1238');
        });
    
        it('Should update expansions after appending number', async () => {
            expect.assertions(1);
    
            await instance.appendNumbericString('8');
    
            expect(instance.updateExpansions).toBeCalled();
        });

    });

    describe('Removing last number from numeric string', () => {

        it('Should remove the last number', async () => {
            expect.assertions(1);
    
            instance.state.numStr = '123';
    
            await instance.removeLastNumber();
    
            expect(instance.state.numStr).toBe('12');
        });

        it('Should keep empty numeric string when numeric string is empty', async () => {
            expect.assertions(1);
    
            instance.state.numStr = '';
    
            await instance.removeLastNumber();
    
            expect(instance.state.numStr).toBe('');
        });

        it('Should update expansions after removing last number', async () => {
            expect.assertions(1);
    
            instance.state.numStr = '123';

            await instance.removeLastNumber();
    
            expect(instance.updateExpansions).toBeCalled();
        });
    });

});

describe('Input string', () => {

    beforeEach(() => {
        instance.updateExpansions = jest.fn();
        instance.clearExpansions = jest.fn();
    });

    describe('Appending string to input', () => {

        it('Should append text to the empty input', () => {
            instance.state.input = '';

            instance.appendInput('hello');

            expect(instance.state.input).toBe('hello');
        });

        it('Should append text to current input', () => {
            instance.state.input = 'hello ';

            instance.appendInput('world');

            expect(instance.state.input).toBe('hello world');
        });

    });

    describe('Removing last letter', () => {

        it('Should remove last letter from the input', () => {
            instance.state.input = 'hello';

            instance.removeLastLetter();

            expect(instance.state.input).toBe('hell');
        });

        it('Should keep empty input when input is empty', () => {
            instance.state.input = '';

            instance.removeLastLetter();

            expect(instance.state.input).toBe('');
        });

        it('Should clear expansions after removing last letter', () => {
            instance.state.input = 'hello';

            instance.removeLastLetter();
    
            expect(instance.clearExpansions).toBeCalled();
        });

    });
});

describe('Expansions', () => {
    
});
