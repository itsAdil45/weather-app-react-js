import React, { useState, useEffect } from 'react';
import useFetch from '../Hooks/useFetch';


const CurrentCityForecast = () => {
  const { data, loading, error } = useFetch(['Lahore']);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  
  useEffect(() => {
      if (data && data[0]) {
          // Filter and map the data to get the date and hour
          const extractedData = data[0].forecast.forecastday.map(({ date, hour }) => ({ date, hour }));
          setFilteredData(extractedData);
          if (extractedData.length > 0 && selectedDate === null) {
            setSelectedDate(extractedData[0].date);
          }
        }
    }, [data,selectedDate]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Find the hourly data for the selected date
  const selectedHourlyData = filteredData?.find(item => item.date === selectedDate)?.hour || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;
  if (!filteredData) return <p>No forecast data available</p>;

  return (
    <div style={{backgroundColor:"rgb(78 207 238 / 40%)", margin:"50px 0"}}>
      <h1>Weather Forecast</h1>
      <div style={{backgroundColor:"rgb(78 207 238 / 40%)", display:"flex", flexDirection:"row", justifyContent:"center",width:"80%", margin:"0 auto", borderRadius:"10px"}}>
        {filteredData.map((item, index) => (
                <button style={{margin:"10px", backgroundColor:"#1976d2", color:"white", padding:"10px", cursor:"pointer", border:"none", borderRadius:"10px"}} key={index} onClick={() => handleDateClick(item.date)}>
                    {item.date}
                </button>
        ))}
      </div>

      {selectedDate && (
        <div>
          <h2>Hourly Report for {selectedDate}</h2>
          <h4>Current City: Lahore</h4>
          {selectedHourlyData.length > 0 ? (
            <ul style={{display:"flex", flexWrap:"wrap", listStyle:"none", justifyContent:"space-around", alignItems:"center",width:"80%",margin:"0 auto", backgroundColor:"rgb(78 207 238 / 10%)",borderRadius:"10px", color:"white"}}>
              {selectedHourlyData.slice(0,5).map((hourData, idx) => (
                <li key={idx}>
                  <p>Time: {hourData.time}</p>
                  <p>Temperature: {hourData.temp_c}°C</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hourly data available for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentCityForecast;
