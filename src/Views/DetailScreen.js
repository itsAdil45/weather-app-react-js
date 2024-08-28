import React from "react";
import { useLocation } from 'react-router-dom';
import ResponsiveAppBar from "../Components/ResponsiveAppBar";
const DetailScreen=()=>{
    const location = useLocation();
    const { city } = location.state || {};
    return( 

        <div>
                <ResponsiveAppBar/>
            <div style={{border:"2px solid #5fffff", 
                        width:"20%", 
                        margin:"50px auto", 
                        padding:"10px",
                        borderRadius:"10px",
                        fontSize:"13px",
                        boxShadow:"0px 1px 28px 6px black"
                       
                }}>
            <h2>City Name: {city.location.name}</h2>
            <h2>Region Name: {city.location.region}</h2>
            <h2>Country Name: {city.location.country}</h2>
            <h2 style={{display:"inline-block"}}>Condition: {city.current.condition.text}</h2>
            <img alt="" style={{display:"inline-block",  margin:"0px 40%"}} src={city.current.condition.icon}/>
            <h2>Wind: {city.current.wind_mph}mph</h2>
            <h2>Feels Like: {city.current.feelslike_c}C</h2>
            </div>
        
        </div>
    )
}

export default DetailScreen;