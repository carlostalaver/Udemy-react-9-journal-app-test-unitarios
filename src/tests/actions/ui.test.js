import { setError } from "../../actions/ui"
import { types } from "../../types/types";


describe('Pruebas en ui', () => {

    test('todas las acciones deben de funcionar', () => {

        const help ='HELP';
        const action = setError(help);

        expect( action ).toEqual({
            type: types.uiSetError,
            payload: help
        });
    })
})