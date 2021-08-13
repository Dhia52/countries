import { CountryCard } from '../types/CountryCard'

/**
 * Sorts countries based on the initial letter
 * 
 * @param countries array of countries
 * @returns a Map object of countries
 */

export function sortCountries (countries: CountryCard[]) {
    //Sorts countries alphabetically depending on name property
    countries.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
    
    let sortedCountries = new Map()

    countries.forEach(country => {
        let firstLetter = country.name[0].toUpperCase()

        //Creates new key if it does not exist
        if(!sortedCountries.has(firstLetter)) {
            sortedCountries.set(firstLetter, [])
        }
        let value = sortedCountries.get(firstLetter)
        value.push(country)
        sortedCountries.set(firstLetter, value)
    })
    return sortedCountries
}