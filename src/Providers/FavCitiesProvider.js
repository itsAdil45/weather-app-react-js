import React, { createContext, useContext, useState, useEffect } from 'react';

const FavCitiesContext = createContext();

export const useFavCities = () => useContext(FavCitiesContext);

export const FavCitiesProvider = ({ children }) => {
  const [favCities, setFavCities] = useState(() => {
    const savedCities = sessionStorage.getItem('favCities');
    return savedCities ? JSON.parse(savedCities) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('favCities', JSON.stringify(favCities));
  }, [favCities]);

  const addFav = (object) => {
    const isDuplicate = favCities.some((city) => object.location.name === city.location.name);
    if (!isDuplicate) {
      setFavCities([...favCities, object]);
    }
  };

  const removeFav = (object) => {
    const updatedCities = favCities.filter((city) => city.location.name !== object.location.name);
    setFavCities(updatedCities);
  };

  return (
    <FavCitiesContext.Provider value={{ favCities, addFav, removeFav }}>
      {children}
    </FavCitiesContext.Provider>
  );
};
