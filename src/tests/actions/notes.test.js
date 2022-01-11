
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';

import { types } from '../../types/types';
const middlewares = [thunk] 
const mockStore = configureStore(middlewares);

const initState = {
    auth:{
        uid:'TESTING'
    },
    notes:{
        active:{
            id: 'CWFNW8mxt0WJQOanKjz5', // este id debe existir en la BBDD de prueba
            title:'Hola',
            body:'Mundo'
        }
    }
};

/* aqui simulo como quiero que luzca el store en este momento preciso que necesito probar startNewNote( requiere el uid)*/
let store = mockStore( initState );


/* esta funcion espara evitar este error  Error: Not implemented: window.scrollTo, que salta porque no tengo alert como en el navegador .
     esta configuracion es para poder hacer funcionar el test('startUploading debe de actualizar la url de la nota´)
     que a nivel de pruebas no puedo usar la consola como la que tiene el navegador, entonces sobreescribo la funcion scrollTo para que no me de error*/
     global.scrollTo = jest.fn(); 

/*Creo un mock de la funcion  fileUpload*/
import {
    fileUpload
} from '../../helpers/fileUpload';
jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn(() => {// mokea la funcion fileUpload para que cuando sea llamada me entregue la url a mi conveniencia
        // return 'https://hola-mundo.com/cosa.jpg'; esto funciona a pesar de no estar retornando una promesa, pero para ser mas preciso
        return Promise.resolve('https://hola-mundo.com/cosa.jpg'); // retorno una promesa porq fileUpload ciertamente retorna una funcion
    })
}));




/* para estas pruebas instale npm i redux-mock-store --save-dev ->  npm https://www.npmjs.com/package/redux-mock-store
que como lo indica es para mokear el store que me ayudará a saber con argumentos fue llamado, que acciones fueron disparadas y otras cosas.
Estas prueban se ejecutan apuntando a la BBDD udemy-test-unitarios y no a la BBDD que uso para develop
*/
describe('Pruebas con las acciones de note', () => {


    /* En cada test reinicio el store porque de lo contraria recordará cada uno de los dispatch hechos en cada test */
    beforeEach(()=>{
        store = mockStore( initState );
    });

    test('debe de crear una nueva nota startNewNote', async () => {
        await store.dispatch(startNewNote());

        const actions = store.getActions(); // me retorna todas las acciones que se despacharon al llamar a startNewNote;

        //    console.log(actions);

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        // Borrar de la BBDD los registros recien agregados para evitar llenarla con basura
        const docId = actions[0].payload.id;
        // console.log(actions[0]);
        await db.doc(`/TESTING/journal/notes/${ docId }`).delete();

    });

    test('startLoadingNotes debe cargar las notas ', async() => {
        
        await store.dispatch( startLoadingNotes(store.getState().auth.uid) );

        const actions = store.getActions();
        // console.log(actions)

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)

        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        };

        expect( actions[0].payload[0] ).toMatchObject( expected );
    })


    
    test('startSaveNote debe actualizar una nota ', async() => {
        
        const note = {
            id: '1x2W4IgZhpPfZDGqMuE7', // ojo que este id debe estar en firestore sino no actualizara una wea
            title: 'Titulo actualizado',
            body: 'Body actualizado'
        }
        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();
        // console.log(actions)

        expect( actions[0].type ).toBe(types.notesUpdated)
    });

    test('startUploading debe de actualizar la url de la nota', async() => {

        const file = new File([], 'foto.png');
        await store.dispatch( startUploading( file ) );
        const docRef = await db.doc('/TESTING/journal/notes/CWFNW8mxt0WJQOanKjz5').get();
        expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg');
    })
    
});