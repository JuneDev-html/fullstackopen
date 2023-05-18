import { useState, useEffect } from "react";
import countriesService from "./service/countries";
import helper from "./service/helper";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countriesService.readAll().then((returnedCountries) => {
      setAllCountries(returnedCountries);
    });
  }, []);

  if (!allCountries) return null;

  const handleChange = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  const showCountry = (country) => {
    setFilter(country);
  };

  const filtered = allCountries.filter((country) =>
    helper.findMatches(country, filter)
  );

  const found = helper.listCountriesFound(filtered, filter, showCountry);

  return (
    <div>
      <form>
        <div>
          find countries{" "}
          <input type="text" onChange={handleChange} value={filter} />
        </div>
      </form>
      {found}
    </div>
  );
}

export default App;
