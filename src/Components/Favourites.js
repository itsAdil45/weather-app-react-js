import React from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Delete } from "@mui/icons-material";
const Favourites = (props) => {
  return (
    <div>
      <h1>Fav Cities</h1>
      {props.favorites.length > 0 ? (
        
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
        { props.favorites.map((favCity, index) => (
                  <Card sx={{ minWidth: 275 }} key={index} style={{backgroundColor:favCity.current.temp_c<31? "#C8C8C8":"#fff25c", width:"20%", borderRadius:"10px"}}>
                  <CardContent>
                      <Link to="/detail" state={{ city: favCity }} key={index} style={{textDecoration:"none"}}>
                            <h2 style={{color:"black"}}>{favCity.location.name}</h2>
                      </Link>
                            <p>Temperature: {favCity.current.temp_c}°C</p>
                          <Button 
                            onClick={() => props.removeFav(favCity)} 
                            variant="contained"
                            style={{backgroundColor:"red"}}
                            startIcon={<Delete />}
                            >
                            Remove Favourite
                          </Button>
                    </CardContent>
                    </Card>

        ))}

        </div>
        
      ) : (
        <p style={{color:"white"}}>No Favourites Added</p>
      )}
    </div>
  );
};

export default Favourites;
