import {React,useState,useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import Favourites from "./Favourites";

const Home=()=>{
const [cities] = useState(['Lahore', 'Karachi', 'Islamabad']);
const [favCities, setFavCities] = useState(()=>{
  const savedCities = sessionStorage.getItem("favCities")
  return savedCities? JSON.parse(savedCities):[]
}
  
);
const [searchCity, setSearchedCity] = useState([]);

const {data, loading, error} = useFetch(cities);
const navigate = useNavigate();

  useEffect(()=>{
      sessionStorage.setItem("favCities", JSON.stringify(favCities));
  },[favCities])

  const handleSearch = () => {
    if(searchCity[0]!=null){
    if (searchCity[0].trim()) {
      navigate(`/result?city=${searchCity}`);
    }
  }
  };
  const addFav=(object)=>{
    const isDublicate = favCities.some(city=>object.location.name===city.location.name);
    if(!isDublicate){
      setFavCities([...favCities,object])
    }
  }
  const removeFav=(object)=>{
    const updatedCities = favCities.filter((city) => city.location.name !== object.location.name);
    setFavCities(updatedCities);
  }

if(loading){
    return <p>loading....</p>
}
if(error){
    return <p>error: {error.message}</p>
}
return(
    <div style={{textAlign:"center"}}>
      <h1>Weather Data</h1>
      
      <div style={{margin:"30px"}}>
        <input placeholder="Search City" value={searchCity} onChange={(e)=>setSearchedCity([e.target.value])}/>
        <button onClick={handleSearch}>Search</button>
      </div>

      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
      {data.map((cityData, index) => (
        <div key={index} style={{backgroundColor:"#C8C8C8", width:"20%", borderRadius:"10px"}}>

          <Link to="/detail" state={{ city: cityData }} key={index}>
                <h2>{cityData.location.name}</h2>
          </Link>
                <p>Temperature: {cityData.current.temp_c}°C</p>
                <button onClick={()=>{addFav(cityData)}}>Add Favourite</button>
        </div>
      ))}
      </div>

      <Favourites favorites={favCities} removeFav ={removeFav}/>
    </div>
);
};

export default Home;