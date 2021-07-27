require('dotenv').config();
const { leerInput, inquirerMenu, pausa, listadoLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {
    const busquedas = new Busquedas();
    let option;
    do {
        option = await inquirerMenu();
        switch (option) {
            case 1:
                //Mostrar mensaje
                const search = await leerInput('Ciudad: ');
                //Buscar Lugares 
                const lugares = await busquedas.ciudad(search);
                //Seleccionar Lugares
                const id = await listadoLugares(lugares);
                const lugarSeleccionado = lugares.find(lugar => lugar.id === id);
                //clima

                //Mostrar resulatados
                console.log('informacion de la ciudad\n');
                console.log('Ciudad: ', lugarSeleccionado.nombre);
                console.log('Lat: ', lugarSeleccionado.lat);
                console.log('Lng: ', lugarSeleccionado.lng);
                console.log('Temperatura: ');
                console.log('Mínima: ');
                console.log('Máxima: ');
                console.log('Ciudad: ');

                break;

            case 2:
                console.log('Historial');
                break;
            case 3:
                console.log('Salir');
                break;
        }
        if (option !== 0) {
            await pausa();
        }
    } while (option !== 0);

}
main()