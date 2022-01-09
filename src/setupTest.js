import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createSerializer} from 'enzyme-to-json';
import '@testing-library/jest-dom';
Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

//#region esta configuracion es para poder hacer funcionar el test('startUploading debe de actualizar la url de la nota´)
// que a nivel de pruebas no puedo usar la consola como la que tiene el navegador, entonces sobreescribo la funcion scrollTo para que no me de error
/*     const noScroll = () => {};
    Object.defineProperty(window, 'scrollTo', {value: noScroll, writable: true}); */

//endregion