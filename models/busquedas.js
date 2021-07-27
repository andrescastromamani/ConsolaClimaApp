const fs = require('fs');
const axios = require('axios')

class Busquedas {
    historial = []
    dbPath = './db/database.json'
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
    get paramsOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metrics',
            lang: 'es'
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
    async climaCiudad(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon }
            })
            const response = await instance.get()
            const { weather, main } = response.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }
        } catch (error) {
            console.log(error)
        }
    }
    agregarHistorial(ciudad = '') {
        //Prevenir duplicados
        if (this.historial.includes(ciudad.toLowerCase())) return
        this.historial.unshift(ciudad)
        //Guardar en DB
        this.guardarDB()
    }
    guardarDB(){
        const payload  = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }
}

module.exports = Busquedas;