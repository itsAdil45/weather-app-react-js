import React from "react";
import { Link } from "react-router-dom";

const  Favourites =(props)=>{
    return(
        <div>
        <h1>Fav Cities</h1>
        {
            props.favorites.map((favCity, index)=>(
            <div key={index}>
            <Link to="/detail" state={{ city: favCity }} key={index}>
                <h3>{favCity.location.name}</h3>
            </Link>
                <button onClick={()=>{props.removeFav(favCity)}}> Remove it </button>
            </div>
            ))
        }
        </div>
    )
}

export default Favourites;