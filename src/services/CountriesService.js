import axios from 'axios'

const instance = axios.create({
    baseURL: "https://restcountries.eu/rest/v2/",
    timeout: 30000
})

export async function getAllCountries() {
    const response = await instance.get('all')
    return response.data
}

export async function getCountry(country) {
    const response = await instance.get(`name/${country}`)
    return response.data
}