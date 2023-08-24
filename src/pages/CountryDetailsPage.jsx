import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function CountryDetailsPage() {
  const { countryId } = useParams();

  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then((response) => {
        console.log(response.data);
        setCountryDetails(response.data);
      })
      .catch((error) => {
        console.error("Error getting country data:", error);
      });
  }, [countryId]);

  if (countryDetails === null) {
    return <h3>Trying to get the country details! Please, wait a moment...</h3>;
  }

  return (
    <div>
      <h2>{countryDetails.name.common}</h2>
      <p>Capital: {countryDetails.capital[0]}</p>
      <p>Area: {countryDetails.area} km²</p>
      <h4>Borders:</h4>
      <ul>
        {countryDetails.borders.map((borderCountry) => (
          <li key={borderCountry}>
            <Link to={`/${borderCountry}`}>{borderCountry}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountryDetailsPage;