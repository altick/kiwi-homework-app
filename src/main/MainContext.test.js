import React from 'react';
import renderer from 'react-test-renderer';
import MainContext from './MainContext';

let rendered: renderer.ReactTestRenderer = null;
let instance = null;

beforeEach(() => {
    rendered = renderer.create(<MainContext.Provider />);
    instance = rendered.getInstance();
})

let fetchMockFn = null;
function mockFetch(impl) {
    fetchMockFn = jest.fn().mockImplementation(impl);
    global.fetch = fetchMockFn;
}

describe('Get expansions', () => {

    beforeEach(() => {
        mockFetch(() => Promise.resolve({
            ok: true, 
            json: () => ([
                'a', 'b', 'c'
            ])
        }));
    });

    it('Should fetch expansions', async () => {
        expect.assertions(1);
    
        let expansions = await instance.getExpansions('234', { serverIpAddress: 'localhost:1234' });
    
        expect(expansions).toEqual([ 'a', 'b', 'c' ]);
    });
    
    it('Should fetch expansions from the correct endpoint', async () => {
        expect.assertions(1);
    
        let expansions = await instance.getExpansions('234', { serverIpAddress: 'localhost:1234' });
    
        expect(fetchMockFn).toBeCalledWith( `http://localhost:1234/expand/234?limit=5` );
    });

    it('Should not fetch expansions for empty input', async () => {
        expect.assertions(1);

        let expansions = await instance.getExpansions('', { serverIpAddress: 'localhost:1234' });

        expect(fetchMockFn).not.toBeCalled();
    });

    it('Should throw error when fetch fails', async () => {
        expect.assertions(1);

        mockFetch(() => Promise.resolve({
            ok: false
        }));
        global.fetch = fetchMockFn;

        expect(instance.getExpansions('234', { serverIpAddress: 'localhost:1234' }))
            .rejects.toEqual(new Error('Couldn\'t fetch expansions'))
    });

});


describe('Get predictions', () => {

    beforeEach(() => {
        mockFetch(() => Promise.resolve({
            ok: true, 
            json: () => ([
                'hello', 'world', 'today'
            ])
        }));
    });

    it('Should fetch predictions', async () => {
        expect.assertions(1);
    
        let expansions = await instance.getPredictions('234', { serverIpAddress: 'localhost:1234' });
    
        expect(expansions).toEqual([ 'hello', 'world', 'today' ]);
    });
    
    it('Should fetch preditions from the correct endpoint', async () => {
        expect.assertions(1);
    
        let expansions = await instance.getPredictions('234', { serverIpAddress: 'localhost:1234' });
    
        expect(fetchMockFn).toBeCalledWith( `http://localhost:1234/predict/234?limit=5` );
    });

    it('Should not fetch predictions for empty input', async () => {
        expect.assertions(1);

        let expansions = await instance.getPredictions('', { serverIpAddress: 'localhost:1234' });

        expect(fetchMockFn).not.toBeCalled();
    });

    it('Should throw error when fetch fails', async () => {
        expect.assertions(1);

        mockFetch(() => Promise.resolve({
            ok: false
        }));
        global.fetch = fetchMockFn;

        expect(instance.getPredictions('234', { serverIpAddress: 'localhost:1234' }))
            .rejects.toEqual(new Error('Couldn\'t fetch predictions'))
    });
    
});