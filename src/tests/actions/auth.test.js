import '@testing-library/jest-dom';// esta importacion me sirve para el intellicense
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";


const middlewares = [thunk] 
const mockStore = configureStore(middlewares);

const initState = {};
/* aqui simulo como quiero que luzca el store en este momento preciso que necesito ejecutar el test*/
let store = mockStore( initState );


describe('Pruebas en las acciones de Auth', () => {

    /* En cada test reinicio el store porque de lo contraria recordará cada uno de los dispatch hechos en cada test */
    beforeEach(()=>{
        store = mockStore( initState );
    });

    test('login y logout deben de crear la acción respectivas ', () => {

        const uid = 'ABC123';
        const displayName = 'Carlos';

        const loginAction =  login( uid, displayName );
        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload:{
                uid: uid,
                displayName: displayName
            }
        });


        
        expect( logoutAction ).toEqual({
            type: types.logout
        });
        
    });

    test('debe de ralizar el startLogout ', async () => {
        
       await store.dispatch( startLogout() );
       const actions = store.getActions();
    //    console.log(actions);

       expect( actions[0] ).toEqual({ type: types.logout });
       expect( actions[1] ).toEqual({ type: types.notesLogoutCleaning });
    });

    test('debe de inicicar el startLoginEmailPassword ', async() => {

        /* nota: el usuario: test@testing.com y password: 123456, lo configuré en firebase, de no ser así no se loguea */
        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );
        const actions = store.getActions();
        // console.log(actions);
        

       expect( actions[0] ).toEqual({ type: types.uiStartLoading });
       expect(actions[1]).toEqual({
           type: types.login,
           payload: {
               uid: expect.any(String),
               displayName: null
           }
       });
        

    })
    
    
    
})