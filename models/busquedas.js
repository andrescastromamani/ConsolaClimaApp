const axios = require('axios')

class Busquedas {
    constructor() {
        //leer DB si existe
    }
    get paramsMapBox() {
        return {
            access_token: 'pk.eyJ1IjoiYW5kcmVzY2FzdHJvbWFtYW5pIiwiYSI6ImNrcm0xa2ppcDF1aDYyb280MHkxNTZ3N3MifQ.aJNu81HJ9WA6iSNReTgDnQ',
            limit: 5,
            language: 'es'
        }
    }
    async ciudad(ciudad = '') {
        try {
            //peticion HTTP
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ ciudad }.json`,
                params: this.paramsMapBox
            })
            const response = await instance.get()
            console.log(response.data)

            return [];
        } catch (error) {
            return [];
        }

    }


}

module.exports = Busquedas;