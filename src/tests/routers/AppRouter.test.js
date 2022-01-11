
import '@testing-library/jest-dom';// esta importacion me sirve para el intellicense

import React from 'react';
import { mount  } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter me permite fingir las rutas y trabajar como si estuviera dentro del navegador web

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { firebase } from '../../firebase/firebase-config';

import { login } from '../../actions/auth';
import { act } from '@testing-library/react';
import { AppRouter } from '../../routers/AppRouter';
jest.mock('../../actions/auth', () => ({ // OJO que el callback DEBE RETORNAR UN OBJETO, por eso los  () despues de la =>
    login: jest.fn(),
}));

import Swal from 'sweetalert2';
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    close: jest.fn()

    /* no se coloca:
    Swal: jest.fn(), xq sweetalert2 hace una exportacion por defecto, de hacerlo estoria diciendo retornando un objeto que tiene una propiedad llamda Swal y eso no es cierto,
    estoy retornando una parranda de cosas de entre las cuales solo mokeo la funcion fire
    */
}));
 
const middlewares = [thunk] 
const mockStore = configureStore(middlewares);
const initState = {
    auth:{},
    ui:{
        loading: false,
        msgError: null
    },
    notes:{
        active:{
            id:'ABC',
        },
        notes:[]
    }
};
let store = mockStore( initState );
store.dispatch = jest.fn();


describe('Pruebas en <AppRouter />', () => {

    
    test('debe llamar al login si estoy autenticado ', async () => {
        let user;

        /* act()se asegura de que todo lo que pueda llevar tiempo (representación, eventos de usuario, obtención de datos, etc)
         se complete antes de que se ejecuten las afirmaciones/aserciones de la prueba. */
         await act(async()=> {

            // 'test@testing.com', '123456'  credenciales existen en la BBDD de prueba
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            //  console.log(store.getActions());
            user = userCred.user;

            const wrapper =  mount(
                <Provider store= { store }>
                    <MemoryRouter>
                       <AppRouter />
                    </MemoryRouter>
                 </Provider>
                );
         });

         expect( login ).toHaveBeenCalled();
        
    })
    
})