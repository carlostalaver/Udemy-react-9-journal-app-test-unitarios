
import '@testing-library/jest-dom';// esta importacion me sirve para el intellicense

import React from 'react';
import { mount  } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import { activeNote, startNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';
import { JournalEntry } from '../../../components/journal/JournalEntry';

jest.mock('../../../actions/notes', () => ({ // OJO que el callback DEBE RETORNAR UN OBJETO, por eso los  () despues de la =>
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
        active:null,
        notes:[]
    }
};
let store = mockStore( initState );
store.dispatch = jest.fn();

const nota = {
    id: 10,
    date:0,
    title: 'Hola',
    body: 'Mundo',
    url: 'https://algunlugar.com/foto.jpg'
}

const wrapper =  mount(
    <Provider store= { store }>
           <JournalEntry {...nota}/>
     </Provider>
    );



describe('Pruebas en <JournalEntry />', () => {

    test('debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de activar la nota ', () => {
        wrapper.find('.journal__entry').prop('onClick')();

        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(nota.id, {...nota})
        );  
        
    });
    
    
})