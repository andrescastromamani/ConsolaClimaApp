var inquirer = require('inquirer');
var colors = require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas hacer?',
        choices: [
            {
                name: `${'1.'.green} Buscar Ciudad`,
                value: 1
            },
            {
                name: `${'2.'.green} Historial`,
                value: 2
            },
            {
                name: `${'3.'.green} Salir`,
                value: 0
            },
        ]

    }
]

const inquirerMenu = async () => {
    //console.clear()
    console.log('====================='.green)
    console.log('Seleccione una Opcion');
    console.log('=====================\n'.green);
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}
const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`,
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);
}
const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese una descripcion'
                }
                return true
            }
        }
    ]
    const { desc } = await inquirer.prompt(question)
    return desc
}
const listadoLugares = async (lugares = []) => {
    const choices = lugares.map((lugar, i) => {
        const index = `${i + 1}.`.green;
        return {
            value: lugar.id,
            name: `${index} ${lugar.nombre}`
        }
    });
    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`.red,
    })
    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccionar Lugar: ',
            choices: choices
        }
    ]
    const { id } = await inquirer.prompt(question);
    return id
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoLugares,
}