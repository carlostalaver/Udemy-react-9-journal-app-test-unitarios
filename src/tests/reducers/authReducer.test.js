import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


describe('Pruebas en authReducer', () => {

    test('debe de realizar login ', () => {
        
        const initialState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'carlos'
            }

        };

        const state = authReducer(initialState, action);

        expect( state ).toEqual({
            uid: 'abc',
            name: 'carlos'
        });

    });


    test('debe de realizar el logout ', () => {
        
        const initialState = {
            uid:'abcdefg',

        };
        const action = {
            type: types.logout
        };

        const state = authReducer(initialState, action);

        expect( state ).toEqual({});

    });

    test('no debe de realizar cambios en el state ', () => {
        
        const initialState = {
            uid:'abcdefg',

        };
        const action = {
            type: 'sin_tipo'
        };

        const state = authReducer(initialState, action);

        expect( state ).toEqual(initialState);

    })
    
})