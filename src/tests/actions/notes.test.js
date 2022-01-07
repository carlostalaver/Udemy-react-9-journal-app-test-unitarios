
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { startNewNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
const middlewares = [thunk] 
const mockStore = configureStore(middlewares)

/* aqui simulo como quiero que luzca el store en este momento preciso que necesito probar startNewNote( requiere el uid)*/
const store = mockStore({
    auth:{
        uid:'TESTING'
    }
});




/* para estas pruebas instale npm i redux-mock-store --save-dev ->  npm https://www.npmjs.com/package/redux-mock-store
que como lo indica es para mokear el store que me ayudará a saber con argumentos fue llamado, que acciones fueron disparadas y otras cosas.
Estas prueban se ejecutan apuntando a la BBDD udemy-test-unitarios y no a la BBDD que uso para develop
*/
describe('Pruebas con las acciones de note', () => {

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
        console.log(actions[0]);
        await db.doc(`/TESTING/journal/notes/${ docId }`).delete();

    });
});