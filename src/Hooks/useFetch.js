import {useState, useEffect} from "react";
import axios from "axios";
const useFetch=(cities)=>{
    const[data, setData]= useState([]);
    const[loading, setLoading] = useState(true);
    const[error , setError] = useState(null);

    useEffect(()=>{
        const fetchData =async()=>{
            setLoading(false);
            try {
                const responses = await Promise.all(cities.map((city)=>( axios.get(`http://api.weatherapi.com/v1/forecast.json?key=25ea86c2cb1d42c0b4a82104241508&q=${city}&aqi=yes`))));
                setData(responses.map(response => response.data));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
              }
        }
        fetchData();
    },[cities])
return {data,loading,error};
}

export default useFetch;