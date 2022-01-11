import '@testing-library/jest-dom';// esta importacion me sirve para el intellicense

import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import { mount,configure  } from 'enzyme';
configure({adapter: new Adapter()});
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter me permite fingir las rutas y trabajar como si estuviera dentro del navegador web

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { LoginScreen } from '../../components/auth/LoginScreen';

/* hago un mock de la funcion  startGoogleLogin que esta en el archivo ../../actions/auth*/
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
jest.mock('../../actions/auth', () => ({ // OJO que el callback DEBE RETORNAR UN OBJETO, por eso los  () despues de la =>
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

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
store.dispatch = jest.fn(); // mockeo la funcio dispatch del store ya que este dispatch se llama desde dentro la funcion handleGoogleLogin ne LoginScreen

const wrapper =  mount(
    <Provider store= { store }>
        <MemoryRouter>
           <LoginScreen />
        </MemoryRouter>
     </Provider>
    );

describe('Pruebas en <LoginScreen />', () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks(); // es buena practica limpiar los mock
    });


    test('debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();      
    })

    test('debe disparar la accion de startGoogleLogin ', () => {
       wrapper.find('.google-btn').prop('onClick')();

       expect( startGoogleLogin ).toHaveBeenCalled();
            
    })

    test('debe disparar el startLoginEmailPassword con los respectivos argumentos ', () => {
        wrapper.find('form').prop('onSubmit')({preventDefault(){}}) ;
        
        expect( startLoginEmailPassword ).toHaveBeenCalledWith('nando@gmail.com','123456');
     })
    

})