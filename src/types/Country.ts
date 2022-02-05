import { CountryCard } from './CountryCard'
import { Currency } from './Currency'

export interface Country extends CountryCard {
    altSpellings: string[],
    area: number,
    borders: string[],
    capital: string[],
    coatOfArms?: {
        png: string,
        svg: string
    }
    currencies: Currency[],
    demonyms: {
        [languageCode: string] : {
            f: string,
            m: string
        }
    },
    flag: string,
    languages: { [languageCode: string] : string },
    latlng: number[],
    name: {
        common: string,
        official: string,
        nativeName: {
            [languageCode: string]: {
                official: string,
                common: string
            }
        }
    },
    region: string,
    subregion: string,
    translations: {
        [languageCode: string]: {
            official: string,
            common: string
        }
    },
    unMember: boolean
}