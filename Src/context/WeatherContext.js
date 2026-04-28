import React, { createContext, useState } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null); // 
  const [theme, setTheme] = useState(null); // New state for theme

  return (
    <WeatherContext.Provider
      value={{
        data,
        setData,
        location,
        setLocation,
        locationName, //
        setLocationName,
        theme,
        setTheme,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
