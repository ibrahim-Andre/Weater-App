import { useState } from "react";
import { WEA_API_KEY, WEA_API_URL } from "./Api";
import "./App.css";
import Search from "./components/search/Search";
import CurrentWeather from "./components/weater/CurrentWeather";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (dataSearch) => {
    const [lat, lon] = dataSearch.value.split("");

    const CurrentWeatherFetch = fetch(
      `${WEA_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEA_API_KEY}`
    );
    const forecastFetch = fetch(
      `${WEA_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEA_API_KEY}`
    );
    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: dataSearch.label, ...weatherResponse });
        setForecast({ city: dataSearch.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentWeather);
  console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
    </div>
  );
}

export default App;
