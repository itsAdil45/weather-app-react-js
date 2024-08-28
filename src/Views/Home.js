import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { useFavCities } from "../Providers/FavCitiesProvider";
import Favourites from "../Components/Favourites";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Favorite, Search } from "@mui/icons-material";
import Input from '@mui/material/Input';
import { IconButton } from "@mui/material";
import ResponsiveAppBar from "../Components/ResponsiveAppBar";

const Home = () => {
    const [cities] = useState(['Lahore', 'Karachi', 'Islamabad']);
    const { favCities, addFav, removeFav } = useFavCities();
    const [searchCity, setSearchedCity] = useState('');
    const { data, loading, error } = useFetch(cities);
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.setItem("favCities", JSON.stringify(favCities));
    }, [favCities]);

    const handleSearch = () => {
        if (searchCity.trim()) {
            navigate(`/result?city=${searchCity}`);
        }
    };

    if (loading) {
        return <p>loading....</p>;
    }
    if (error) {
        return <p>error: {error.message}</p>;
    }

    return (
        <div style={{ textAlign: "center" }}>
            <ResponsiveAppBar />
            <h1>Weather Data</h1>
            <div style={{ margin: "30px", display: "flex", justifyContent: "center" }}>
                <Input
                    placeholder="Search City"
                    style={{ color: "white", width: "300px", maxWidth: "80%" }}
                    value={searchCity}
                    onChange={(e) => setSearchedCity(e.target.value)}
                />
                <IconButton onClick={handleSearch}>
                    <Search />
                </IconButton>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                flexWrap: "wrap",
                gap: "20px",
            }}>
                {data.map((cityData, index) => (
                    <Card
                        key={index}
                        style={{
                            backgroundColor: cityData.current.temp_c < 31 ? "#C8C8C8" : "#fff25c",
                            width: "100%",
                            maxWidth: "300px",
                            borderRadius: "10px",
                            boxSizing: "border-box",
                            padding: "15px",
                        }}
                    >
                        <Link
                            to="/detail"
                            state={{ city: cityData }}
                            key={index}
                            style={{ textDecoration: "none" }}
                        >
                            <h2 style={{ color: "black" }}>{cityData.location.name}</h2>
                        </Link>
                        <p>Temperature: {cityData.current.temp_c}°C</p>
                        <Button
                            onClick={() => { addFav(cityData); }}
                            variant="contained"
                            startIcon={<Favorite />}
                        >
                            Add Favourite
                        </Button>
                    </Card>
                ))}
            </div>
            <div style={{ marginTop: "40px" }}>
                <Favourites favorites={favCities} removeFav={removeFav} />
            </div>
        </div>
    );
};

export default Home;
