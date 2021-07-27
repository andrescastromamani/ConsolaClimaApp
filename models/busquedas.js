const fs = require('fs');
const axios = require('axios')

class Busquedas {
    historial = []
    dbPath = './db/database.json'
    constructor() {
        this.leerDB()
    }
    get historialCapitalizado(){
        return this.historial.map(ciudad =>{
            let palabras = ciudad.split(' ')
            palabras = palabras.map(p => p[0].toUpperCase() + p.slice(1))
            return palabras.join(' ')
        })
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
        if (this.historial.includes(ciudad.toLowerCase())){
            return
        }
        this.historial = this.historial.slice(0,9)
        this.historial.unshift(ciudad.toLocaleLowerCase())
        //Guardar en DB
        this.guardarDB()
    }
    guardarDB(){
        const payload  = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }
    leerDB(){
        if (fs.existsSync(this.dbPath)) {
            const info = fs.readFileSync(this.dbPath,{encode: 'utf-8'})
            const data = JSON.parse(info)
            this.historial = data.historial
        }
        return
    }
}

module.exports = Busquedas;