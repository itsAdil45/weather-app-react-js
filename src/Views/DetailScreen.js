import React from "react";
import { useLocation } from 'react-router-dom';

const DetailScreen=()=>{
    const location = useLocation();
    const { city } = location.state || {};
    return( 

        <div>
            <h2>City Name: {city.location.name}</h2>
            <h2>Region Name: {city.location.region}</h2>
            <h2>Country Name: {city.location.country}</h2>
            <h2>Condition: {city.current.condition.text}</h2>
            <img alt="" src={city.current.condition.icon}/>
            <h2>Wind: {city.current.wind_mph}mph</h2>
            <h2>Feels Like: {city.current.feelslike_c}C</h2>

        
        </div>
    )
}

export default DetailScreen;