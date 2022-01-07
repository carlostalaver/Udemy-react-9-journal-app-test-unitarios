import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";


/* para realizar estas puebas instale npm install cloudinary --save-dev para gestionar la eliminacion de imagenes en cloudinary,
esto es para no estar subiendo la misma imagen cada vez que se ejecutan los test */

cloudinary.config({ 
    cloud_name: 'dxmq8s27l', 
    api_key: '638186877372675', 
    api_secret: 'DuGu1CK7sBi4_WgGz6c0MAhmAwc',
    secure: true
  });
describe('Pruebas en fileUpload',()=>{

    test('debe de cargar un archivo y retornar un url ', async(done) => {

        /* Ojo, no cualquier url de imagen se puede usar ya que va a depender si el servidor donde está alojada permie obtenerla desde un localhost
        
            estas funcionan :'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
                            'https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png'
        */
        const resp = await fetch('https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png'); // me traigo una imagen de google
        
        const blob = await resp.blob(); //Los Blobs representan datos que no necesariamente se encuentran en un formato nativo de JavaScript

        const file =  new File([blob], 'foto.png'); // construyo la imagen a subir
        const url = await fileUpload(file); // subo la imagen a cloudinary

        console.log(url)

        
        expect( typeof url ).toBe('string');
        
        // luego de ejecutar el test elimino la imagen:
        const segments = url.split('/');
        const imageId =  segments[segments.length - 1].replace('.png',''); // obtengo el id de la imagen
        cloudinary.v2.api.delete_resources(imageId, {}, ()=>{
            done();
        }); // esto lo obtengo de -> https://cloudinary.com/documentation/admin_api#delete_resources
    });



    test('debe de retornar un error ', async() => {

        const file =  new File([], 'foto.png');
        const url = await fileUpload(file);
        expect( url ).toBe(null);        
    })
    
} )