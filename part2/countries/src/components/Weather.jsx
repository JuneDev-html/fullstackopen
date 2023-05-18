/* eslint-disable react/prop-types */
export const Weather = ({ weather }) => {
  const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
  return (
    <div>
      <h1>Weather in {weather.name}</h1>
      <div>temperature {weather.main.temp} °F</div>
      <img src={icon} alt="" />
      <div>wind: {weather.wind.speed}</div>
    </div>
  );
};
