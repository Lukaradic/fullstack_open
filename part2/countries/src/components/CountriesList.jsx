import React from "react";
import { getCountryCommonName } from "../utils";

export const CountriesList = ({ list, onClick }) => {
  return (
    <div>
      {list.map((country) => {
        const name = getCountryCommonName(country.name);
        return (
          <div key={country.cca2}>
            {name}
            <button style={{ marginLeft: 4 }} onClick={() => onClick(name)}>
              show
            </button>
          </div>
        );
      })}
    </div>
  );
};
