import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createSerializer} from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
 
import Swal from 'sweetalert2';
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    close: jest.fn()

    /* no se coloca:
    Swal: jest.fn(), xq sweetalert2 hace una exportacion por defecto, de hacerlo estoria diciendo retornando un objeto que tiene una propiedad llamda Swal y eso no es cierto,
    estoy retornando una parranda de cosas de entre las cuales solo mokeo la funcion fire
    */
}));

//#region esta configuracion es para poder hacer funcionar el test('startUploading debe de actualizar la url de la nota´)
// que a nivel de pruebas no puedo usar la consola como la que tiene el navegador, entonces sobreescribo la funcion scrollTo para que no me de error
/*     const noScroll = () => {};
    Object.defineProperty(window, 'scrollTo', {value: noScroll, writable: true}); */

//endregion