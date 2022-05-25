export interface InitCountryData {
    capital: string[],
    population: number,
    latlng: number[],
    flags: {
        svg: string
    }
}

export interface InitCountryDataInfo {
    temperature: number,
    weather_icons: string[],
    wind_speed: number,
    precip: number
}