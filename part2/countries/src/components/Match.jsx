/* eslint-disable react/prop-types */
import getWeather from "../service/weather";
import { useState, useEffect } from "react";
import { Weather } from "./Weather";

export const Match = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeather(country.name.common).then((result) => setWeather(result));
  }, [country.name.common]);

  if (!weather) return null;

  let languages = [];
  for (let language in country.languages) {
    languages.push({ id: language, language: country.languages[language] });
  }

  const languagesList = languages.map((spoken) => (
    <li key={spoken.id}>{spoken.language}</li>
  ));

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <h3>languages:</h3>
      <ul>{languagesList}</ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather weather={weather} />
    </div>
  );
};
