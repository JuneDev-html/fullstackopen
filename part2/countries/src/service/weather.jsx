import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const getWeather = (country) => {
  const request = axios.get(
    `${baseUrl}${country}&appid=${import.meta.env.VITE_API_KEY}&units=imperial`
  );
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export default getWeather;
