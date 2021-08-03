import axios from 'axios'

import Country from '../types/Country'

const instance = axios.create({
    baseURL: "https://restcountries.eu/rest/v2/",
    timeout: 30000
})

export async function getAllCountries(): Promise<Country[]> {
    const response = await instance.get('all?fields=name;flag')
    return response.data
}

export async function getContinentCountries(region: String) {
    const response = await instance.get(`region/${region}`)
    return response.data
}

export async function getCountry(country: string): Promise<Country> {
    const response = await instance.get(`name/${country}`)
    return response.data
}