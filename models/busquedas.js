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
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json`,
                params: this.paramsMapBox
            })
            const response = await instance.get()
            return response.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
        } catch (error) {
            return [];
        }

    }


}

module.exports = Busquedas;