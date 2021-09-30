export interface CountryCard {
    name: {
        common: string,
        official?: string,
        nativeName?: {
            [languageCode: string]: {
                official: string,
                common: string
            }
        }
    },
    flags: {
        svg: string,
        png: string
    },
    cca3: string
}