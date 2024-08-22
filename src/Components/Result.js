import React from "react";
import { useLocation ,Link} from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const Result=()=>{
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const city = query.get("city");
  
    const { data, loading, error } = useFetch([city]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
    
  
    if (error) {
      return <p>Error: No City Found</p>;
    }
  
    return (
      <div>
        <h1>Weather Results</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {data.map((cityData, index) => (
            <div key={index} style={{ backgroundColor: "#C8C8C8", width: "50%", borderRadius: "10px", padding: "20px", marginTop: "20px" }}>
              <Link to="/detail" state={{ city: cityData }} key={index}>
                <h2>{cityData.location.name}</h2>
              </Link>
              <p>Temperature: {cityData.current.temp_c}°C</p>
              <button>Add Favourite</button>
              {/*  onClick={()=>{addFav(cityData)}} */}
            </div>
          ))}
        </div>

      </div>
    );



}

export default Result;