import React, { createContext, useState } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null); // 

  return (
    <WeatherContext.Provider
      value={{
        data,
        setData,
        location,
        setLocation,
        locationName, //
        setLocationName,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
