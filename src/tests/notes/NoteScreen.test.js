import { act } from '@testing-library/react';

import '@testing-library/jest-dom';// esta importacion me sirve para el intellicense

import React from 'react';
import { mount  } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { activeNote } from '../../actions/notes';
import { NoteScreen } from '../../components/notes/NoteScreen';


jest.mock('../../actions/notes', () => ({ // OJO que el callback DEBE RETORNAR UN OBJETO, por eso los  () despues de la =>
    activeNote: jest.fn(),
}));


const middlewares = [thunk] 
const mockStore = configureStore(middlewares);
const initState = {
    auth:{
        uid:'123',
        name:'carlos'
    },
    ui:{
        loading: false,
        msgError: null
    },
    notes:{
        active:{"body": "mundo", "date":0, "id": 1234, "title": "Hola de nuevo"},
        notes:[]
    }
};
let store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper =  mount(
    <Provider store= { store }>
           <NoteScreen />
     </Provider>
    );

describe('Pruebas en <NoteScreen />', ()=>{

    test('debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de disparar el activeNote correctamente ', () => {

        /* simulo un cambio en la caja de texto */
        wrapper.find('input[name="title"]').simulate('change', {
            target:{
                name: 'title',
                vale: 'Hola de nuevo'
            }
        });

        expect( activeNote ).toHaveBeenLastCalledWith(//toHaveBeenLastCalledWith para comparar los resultados de la ultima llamada
            1234,
            {
                body: 'mundo',
                title: undefined,
                id:1234,
                date:0

            }
        );
    })
    
})