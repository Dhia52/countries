import axios from 'axios'

import { Country } from '../types/Country'
import { CountryCard } from '../types/CountryCard'

const instance = axios.create({
    baseURL: "https://restcountries.com/v3.1/",
    timeout: 30000
})

/**
 * Fetches all countries of the world
 * @returns an array of objects representing countries
 */
export async function getAllCountries(): Promise<CountryCard[]> {
    const response = await instance.get('all?fields=name,flags,cca3')
    return response.data
}

/**
 * Fetches all countries of a selected region
 * @param region a string representing a selected region of the world
 * @returns an array of objects representing countries
 */
export async function getContinentCountries(region: String): Promise<CountryCard[]> {
    const response = await instance.get(`region/${region}?fields=name,flags,cca3`)
    return response.data
}

/**
 * Fetches a single country's infos
 * @param countryCode a string representing the ISO 3166-1 alpha-3 country code
 * @returns a country object
 */
export async function getCountry(countryCode: string): Promise<Country> {
    const response = await instance.get(`alpha/${countryCode}`)
    return response.data[0]
}