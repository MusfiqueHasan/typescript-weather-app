import React, { useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const Home = () => {

    const history = useHistory();

    const [countryName, setCountryName] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountryName(event.target.value);
    }

    const onSubmit = () => {
        history.push(`/country/${countryName}`);
    }

    return (
        <Grid container spacing={2} sx={{ p: 5 }}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper elevation={2} sx={{ p: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} lg={12} mb="50px">
                            <Typography sx={{ fontSize: 20, fontWeight: 900, textTransform: 'uppercase', color: '#00acc1', textDecoration: 'underline' }}>Get your  Weather information</Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField
                                sx={{ width: '50%' }}
                                variant="standard"
                                placeholder="Enter country"
                                value={countryName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Button
                                size="medium"
                                variant="contained"
                                disabled={!countryName}
                                onClick={onSubmit}
                                style={{ width: "210px", marginTop: "20px" }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

        </Grid>
    );
}

export default Home;