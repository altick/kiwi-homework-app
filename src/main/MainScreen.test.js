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

    describe('Clear Expansions', () => {
        
        it('Should clear numeric string', () => {
            instance.state = {
                numStr: 'abc'
            };
            
            instance.clearExpansions();

            expect(instance.state.numStr).toBe('');
        });

        it('Should clear expansions list and selected expansion', () => {
            instance.state = {
                expansions: ['hello', 'world'],
                selectedExpansion: 'world'
            };
            
            instance.clearExpansions();

            expect(instance.state.expansions).toHaveLength(0);
            expect(instance.state.selectedExpansion).toBe('');
        });

    });

    describe('Apply expansion', () => {

        beforeEach(() => {
            instance.clearExpansions = jest.fn();
        });

        it('Should append expansion to the input and add trailing space', () => {
            instance.state = {
                input: 'Hello '
            };

            instance.applyExpansion('world');

            expect(instance.state.input).toBe('Hello world ');
        });

        it('Should append selected expansion to the input and add trailing space', () => {
            instance.state = {
                input: 'Hello ',
                selectedExpansion: 'world'
            };

            instance.applySelectedExpansion();

            expect(instance.state.input).toBe('Hello world ');
        });

        it('Should clear expansions after applying expansion', () => {
            instance.applyExpansion('world');

            expect(instance.clearExpansions).toBeCalled();
        });

    });

    describe('Update expansions', () => {

        beforeEach(() => {
            instance.props = {
                actions: {
                    getExpansions: jest.fn( async () => ['aa', 'ab', 'ac'] ),
                    getPredictions: jest.fn(async () => ['hello', 'world'] )
                }
            };
        });

        it('Should return expansions when mode is to set to MODE_EXPAND', async () => {
            expect.assertions(2);

            instance.state = {
                mode: MODE_EXPAND
            };

            await instance.updateExpansions('1');

            expect(instance.state.expansions).toEqual(expect.arrayContaining([ 'aa', 'ab', 'ac' ]));
            expect(instance.state.expansions).toHaveLength(3);
        });

        it('Should return predictions when mode is to set to MODE_PREDICT', async () => {
            expect.assertions(2);

            instance.state = {
                mode: MODE_PREDICT
            };

            await instance.updateExpansions('1');

            expect(instance.state.expansions).toEqual(expect.arrayContaining([ 'hello', 'world' ]));
            expect(instance.state.expansions).toHaveLength(2);
        });

    });

});

describe('Keyboard', () => {

    it('Should append numeric string for keys 23456789', () => {
        let mockFn = jest.fn();
        instance.appendNumbericString = mockFn;

        instance.onKeyClick('2');
        instance.onKeyClick('3');
        instance.onKeyClick('4');
        instance.onKeyClick('5');
        instance.onKeyClick('6');
        instance.onKeyClick('7');
        instance.onKeyClick('8');
        instance.onKeyClick('9');

        expect(mockFn.mock.calls).toEqual([['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9']]);
    });

    it('Should apply selected expansion for key 0', () => {
        let mockFn = jest.fn();
        instance.applySelectedExpansion = mockFn;

        instance.onKeyClick('0');

        expect(mockFn).toBeCalled();
    });

    it('Should remove last number for key 1 if numeric string is not empty', () => {
        let mockFn = jest.fn();
        instance.removeLastNumber = mockFn;
        instance.state.numStr = '1';

        instance.onKeyClick('1');

        expect(mockFn).toBeCalled();
    });

    it('Should remove last letter for key 1 if numeric string is empty', () => {
        let mockFn = jest.fn();
        instance.removeLastLetter = mockFn;
        instance.state.numStr = '';

        instance.onKeyClick('1');

        expect(mockFn).toBeCalled();
    });

    it('Should select previous expansion for key *', () => {
        let mockFn = jest.fn();
        instance.selectPrevExpansion = mockFn;

        instance.onKeyClick('*');

        expect(mockFn).toBeCalled();
    });

    it('Should select next expansion for key #', () => {
        let mockFn = jest.fn();
        instance.selectNextExpansion = mockFn;

        instance.onKeyClick('#');

        expect(mockFn).toBeCalled();
    });
});
