const axios = require('axios')

class Busquedas {
    constructor() {
        //leer DB si existe
    }
    get paramsMapBox() {
        return {
            access_token: process.env.MAPBOX_KEY,
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