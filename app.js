require('dotenv').config();
const { leerInput, inquirerMenu, pausa } = require('./helpers/inquirer');
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
                await busquedas.ciudad(search);
            
                //Buscar Lugares 

                //Seleccionar Lugares

                //clima

                //Mostrar resulatados
                console.log('informacion de la ciudad\n');
                console.log('Ciudad: ');
                console.log('Lat: ');
                console.log('Lng: ');
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