import React from "react";
import { useLocation ,Link} from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { useFavCities } from "../Providers/FavCitiesProvider";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Button from '@mui/material/Button';

const Result=()=>{
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const city = query.get("city");
  
    const { data, loading, error } = useFetch([city]);
    const { addFav } = useFavCities();

    if (loading) {
      return <p>Loading...</p>;
    }
    
    if (error) {
      return <p>Error: No City Found</p>;
    }
  
    return (
      <div style={{textAlign:"center"}}>
        <ResponsiveAppBar/>
        <h1>Weather</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {data.map((cityData, index) => (
            <div key={index} style={{ backgroundColor: "#C8C8C8", width: "20%", borderRadius: "10px", padding: "20px", marginTop: "20px" }}>
              <Link style={{color:"black", textDecoration:"none"}} to="/detail" state={{ city: cityData }} key={index}>
                <h2 >{cityData.location.name}</h2>
              </Link>
              <p>Temperature: {cityData.current.temp_c}°C</p>
              <Button onClick={()=>{addFav(cityData)}}                             
              variant="contained"
              >Add Favourite</Button>
            </div>
          ))}
        </div>

      </div>
    );



}

export default Result;