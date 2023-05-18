import { Match } from "../components/Match";

const findMatches = (country, filter) => {
  const name = country.name.common;
  const regex = new RegExp(filter, "ig");
  return regex.test(name);
};

const listCountriesFound = (countries, filter, showCountry) => {
  if (filter === "") {
    return <p>Please enter filter to find country</p>;
  } else if (countries.length === 1) {
    return <Match country={countries[0]} />;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length <= 10) {
    return countries.map((country) => (
      <div key={country.cca2}>
        {country.name.common}{" "}
        <button onClick={() => showCountry(country.name.common)}>show</button>
      </div>
    ));
  }
};

export default {
  findMatches,
  listCountriesFound,
};
