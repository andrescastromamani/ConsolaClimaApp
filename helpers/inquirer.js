var inquirer = require('inquirer');
var colors = require('colors');
//const Tarea = require('../models/tarea');

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
const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea , i) => {
        const index = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${index} ${tarea.desc}`
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
            message: '¿Qué tarea deseas borrar?',
            choices: choices
        }
    ]
    const { id } = await inquirer.prompt(question);
    return id
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: message,
        }
    ]
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const listadoTareasChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea , i) => {
        const index = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${index} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: '¿Seleccionar Tareas?',
            choices: choices
        }
    ]
    const { ids } = await inquirer.prompt(question);
    return ids
}
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareasChecklist
}