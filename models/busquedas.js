const axios = require('axios')

class Busquedas {
    constructor() {
        //leer DB si existe
    }
    async ciudad(ciudad = '') {
        try {
            //peticion HTTP
            const resp = await axios.get('https://reqres.in/api/users?page=2')
            console.log(resp.data)

            return [];
        } catch (error) {
            return [];
        }

    }


}

module.exports = Busquedas;