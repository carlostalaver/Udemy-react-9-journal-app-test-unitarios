
import '@testing-library/jest-dom';// esta importacion me sirve para el intellicense

import React from 'react';
import { mount  } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter me permite fingir las rutas y trabajar como si estuviera dentro del navegador web

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import { startLogout } from '../../../actions/auth';
import { act } from '@testing-library/react';
import { startNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';
jest.mock('../../../actions/auth', () => ({ // OJO que el callback DEBE RETORNAR UN OBJETO, por eso los  () despues de la =>
    startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({ // OJO que el callback DEBE RETORNAR UN OBJETO, por eso los  () despues de la =>
    startNewNote: jest.fn(),
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
        active:null,
        notes:[]
    }
};
let store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper =  mount(
    <Provider store= { store }>
           <Sidebar />
     </Provider>
    );

describe('Pruebas en <Sidebar />',() => {

    test('debe de mostrar correctamente',()=>{
        expect( wrapper ).toMatchSnapshot();
    })

     test('debe de llamar al startLogout',()=>{
        wrapper.find('button').prop('onClick')();
        expect( startLogout ).toHaveBeenCalled();
    }) 

    test('debe de llamar al startNewNote',()=>{
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect( startNewNote ).toHaveBeenCalled();
    }) 
})