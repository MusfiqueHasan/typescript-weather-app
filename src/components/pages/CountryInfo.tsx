import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";


interface InitNameProps {
    name: string
}

interface InitCountryData {
    capital: string[],
    population: number,
    latlng: number[],
    flags: {
        svg: string
    }
}

interface InitCountryDataInfo {
    temperature: number,
    weather_icons: string[],
    wind_speed: number,
    precip: number
}

const CountryInfo: React.FC = () => {

    const { name } = useParams<InitNameProps>();
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
    const [countryName, setCountryName] = useState<InitCountryData>();
    const [weatherInfo, setWeatherInfo] = useState<InitCountryDataInfo>();

    useEffect(() => {
        getCountry();
    }, []);

    const getCountry = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
            const data = await res.json();
            setCountryName(data.length > 1 ? data[2] : data[0]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const getWeatherInfo = async () => {
        try {
            setWeatherLoading(true);
            const res = await fetch(`http://api.weatherstack.com/current?access_key=ba9de385df8c5f0930b38727951f2a62&query=${countryName?.capital[0]}`);
            const data = await res.json();
            setWeatherInfo(data.current);
            setWeatherLoading(false);
        } catch (error) {
            setWeatherLoading(false);
            console.log(error);
        }
    }

    return (
        <Grid className="country-info" >
            <Typography sx={{ fontSize: 20, fontWeight: 900, textTransform: 'uppercase', color: '#00acc1', textDecoration: 'underline', my: 5 }}>Country Info</Typography>
            <Button
                size="medium"
                variant="contained"
                onClick={() => history.push(`/`)}
            >
                Bake To Home Page
            </Button>
            {
                loading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
                        <CircularProgress />
                    </Box>
                    :
                    countryName ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                            <Box sx={{ width: '40%', display: 'flex' }}>
                                <Paper elevation={2} sx={{ width: "100%", p: 3, display: 'flex', alignItems: 'center' }}>
                                    <img width="100%" src={countryName?.flags.svg} alt="_" />
                                </Paper>
                                <Paper elevation={2} sx={{ width: "100%", p: 3, ml: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                                        Capital: <span style={{ fontWeight: 'normal' }}>{countryName?.capital[0]}</span>
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }} >
                                        Population:<span style={{ fontWeight: 'normal' }}> {countryName?.population}</span>
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                                        Latitude: <span style={{ fontWeight: 'normal' }}>{countryName?.latlng[0]}<sup>o</sup></span>
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                                        Longitude: <span style={{ fontWeight: 'normal' }}>{countryName?.latlng[1]}<sup>o</sup></span>
                                    </Typography>
                                </Paper>

                            </Box>
                        </Box>
                        :
                        <Typography variant="h3">
                            Country not found by name: {name}
                        </Typography>
            }

            {
                countryName && <Button
                    size="medium"
                    variant="contained"
                    onClick={getWeatherInfo}
                >
                    Capital Weather
                </Button>
            }

            {
                weatherLoading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                        <CircularProgress />
                    </Box>
                    :
                    weatherInfo &&
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <Box sx={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                            <Paper elevation={2} sx={{ width: "100%" }}>
                                <Typography sx={{ fontSize: 20, bgcolor: '#2196f3', textTransform: 'uppercase', color: 'white', fontWeight: 'bold' }}>{countryName?.capital[0]} Weather Info</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ width: '50%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', p: 2 }}>
                                        <Box>
                                            <img src={weatherInfo?.weather_icons[0]} alt="_" />
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Temperature: <span style={{ fontWeight: 'normal' }}>{weatherInfo?.temperature}<sup>o</sup></span></Typography>
                                            <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Wind Speed: <span style={{ fontWeight: 'normal' }}>{weatherInfo?.wind_speed}</span></Typography>
                                            <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Precip: <span style={{ fontWeight: 'normal' }}>{weatherInfo?.precip}</span></Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
            }
        </Grid >
    )
}

export default CountryInfo;