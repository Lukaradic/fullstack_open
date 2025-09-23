import { useState } from "react";
import countriesService from "./services/countries";
import { getCountryCommonName } from "./utils";

import { Search } from "./components/Search";
import { CountriesList } from "./components/CountriesList";
import { CountryDisplay } from "./components/CountryDisplay";
import { useEffect } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCountriesList, setAllCountriesList] = useState([]);
  const [singleCountry, setSingleCountry] = useState(null);
  const [countriesList, setCountriesList] = useState([]);

  const getAllCountries = async () => {
    const data = await countriesService.getAll();
    setAllCountriesList(data);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  const handleCountryClick = async (countryName) => {
    const data = await countriesService.getByName(countryName);
    if (data) {
      setSingleCountry(data);
    }
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
    const copy = [...allCountriesList];
    const filtered = copy.filter((country) => {
      const name = getCountryCommonName(country.name).toLowerCase();

      return name.includes(term.toLowerCase());
    });

    setCountriesList(filtered);
  };

  const showCountryList =
    countriesList?.length > 0 && countriesList?.length < 10;

  return (
    <div
      style={{
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <Search onChange={handleSearchTermChange} value={searchTerm} />
      {showCountryList && (
        <CountriesList list={countriesList} onClick={handleCountryClick} />
      )}
      {singleCountry && <CountryDisplay country={singleCountry} />}
    </div>
  );
};

export default App;
