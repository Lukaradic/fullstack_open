import React from "react";
import { getCountryCommonName } from "../utils";

export const CountryDisplay = ({ country }) => {
  const { name, capital, languages, flags, area } = country;
  const { png, alt } = flags;

  if (country === null) {
    return null;
  }

  const countryName = getCountryCommonName(name);

  const showLanguages = () => {
    const languagesArray = Object.values(languages);
    if (!languagesArray?.length) {
    }
    return (
      <ul>
        {languagesArray.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>{countryName}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h4>Languages</h4>
      {showLanguages()}
      <img src={png} alt={alt} />
    </div>
  );
};
