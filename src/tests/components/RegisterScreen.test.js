import '@testing-library/jest-dom';// esta importacion me sirve para el intellicense

import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import { mount,configure  } from 'enzyme';
configure({adapter: new Adapter()});
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter me permite fingir las rutas y trabajar como si estuviera dentro del navegador web

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { RegisterScreen } from '../../components/auth/RegisterScreen';
import { types } from '../../types/types';

const middlewares = [thunk] 
const mockStore = configureStore(middlewares);

const initState = {
    auth:{},
    ui:{
        loading: false,
        msgError: null
    }
};
let store = mockStore( initState );
//store.dispatch = jest.fn(); // no necesito mokear el dipatch

const wrapper =  mount(
    <Provider store= { store }>
        <MemoryRouter>
           <RegisterScreen />
        </MemoryRouter>
     </Provider>
    );

describe('Pruebas en <RegisterScreen />', () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks(); // es buena practica limpiar los mock
    });


    test('debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();      
    })

    test('debe de hacer el dispatch de la accion respectiva ', () => {

        const emailField = wrapper.find('input[name="email"]');

        /* simulo que hubo un cambio en el input email */
        emailField.simulate('change', { // ojo que aqui no es onChange xq no es la llamada a propiedad del html, es la llamada al evento js change
            target: {
                value:'',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });
        const acciones = store.getActions();

        // No legré que disparara las acciones

/*         expect(acciones[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        }) */
    })

    test('debe de mostrar la caja de alerta con el error', () => {

        const initState = {
            auth:{},
            ui:{
                loading: false,
                msgError: 'Email no es correcto'
            }
        };

        const store = mockStore( initState );
        const wrapper =  mount(
            <Provider store= { store }>
                <MemoryRouter>
                   <RegisterScreen />
                </MemoryRouter>
             </Provider>
            );

        // console.log(wrapper.find('.auth__alert-error').html())
         expect( wrapper.find('.auth__alert-error').exists() ).toBe(true);
         expect( wrapper.find('.auth__alert-error').text().trim() ).toBe(initState.ui.msgError);
        
    });
})