import { CountryCard } from './CountryCard'
import { RegionalBloc } from './RegionalBloc'
import { Currency } from './Currency'

export interface Country extends CountryCard {
    altSpellings: String[],
    area: Number,
    borders: String[],
    capital: String,
    currencies: Currency[],
    demonym: String,
    languages: {name: String}[],
    latlng: Number[],
    nativeName: String,
    population: Number,
    region: String,
    regionalBlocs: RegionalBloc[],
    subregion: String,
    translations: Object
}