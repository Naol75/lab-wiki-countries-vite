import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries")
      .then((response) => {
        console.log(response);
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error getting the countries:", error);
      });
  }, []);

  if (countries === null) {
    return <h3>Trying to get the countries List! Please wait a moment...</h3>;
  }

  return (
      <div>
        <h1>WikiCountries: Your Guide to the World</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.alpha3Code}>
            <Link to={`/${country.alpha3Code}`}>
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                alt={country.name.common}
              />
              {country.name.common}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default HomePage