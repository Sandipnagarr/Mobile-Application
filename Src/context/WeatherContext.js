import React, { createContext, useState } from "react";
export const WeatherContext = createContext();
export const WeatherProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null); // 
  const [theme, setTheme] = useState(null); // New state for theme
  const [circle, setCircle] = useState(null);
  const [circleSelected, setCircleSelected] = useState(false);
  const [reportData, setReportData] = useState(null);


  return (
    <WeatherContext.Provider
      value={{
        circle,
        setCircle,
        circleSelected,
        setCircleSelected,
        data,
        setData,
        location,
        setLocation,
        locationName, //
        setLocationName,
        theme,
        setTheme,
        reportData,
        setReportData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
