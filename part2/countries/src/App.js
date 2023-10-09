import React, { useState, useEffect } from "react";
import countriesService from "./services/countries";
import weatherService from "./services/weather";
import Countries from "./components/Countries";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);
  const [fetchCountries, setFetchCountries] = useState(null);
  const [country, setCountry] = useState(null);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(() => true);
    countriesService
      .getAll()
      .then((res) => {
        setCountry(() => null);
        setCountries(() => res);
        setFetchCountries(() => res);
        setLoading(() => false);
      })
      .catch((error) => {
        setCountry(() => null);
        setLoading(() => false);
        ifError(error);
      });
  }, []);

  useEffect(() => {
    if (!countries) return;

    if (countries.length === 1) {
      setLoading(() => true);
      console.log("fetching one country", countries);
      countriesService
        .search(countries[0].name.common)
        .then((country) => {
          setCountry(country);
          weatherService.getWeather(country.latlng).then((data) => {
            setWeather(() => data);
            setLoading(() => false);
          });
        })
        .catch((error) => {
          ifError(error);
        });
    }
  }, [countries]);

  useEffect(() => {
    console.log("search usefeect", countries);
    if (search.length === 0) {
      setCountries(() => fetchCountries);

      setCountry(() => null);
      return;
    }

    filterCountries();
  }, [search]);

  const filterCountries = () => {
    setCountries((prev) =>
      prev.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleChangeSearch = (e) => {
    setSearch(() => e.target.value);
  };

  const handleShowCountry = (c) => {
    setLoading(true);
    countriesService
      .search(c.name.common)
      .then((country) => {
        setCountry(() => country);
        weatherService.getWeather(country.latlng).then((data) => {
          setWeather(() => data);
          setLoading(() => false);
        });
        setLoading(false);
      })
      .catch((error) => ifError(error));
  };

  console.log("country", country);

  const ifError = (error) => {
    setLoading(false);
    setError(error.message);
    setSearch("");
    setTimeout(() => {
      setError("");
    }, 3500);
  };

  return (
    <>
      {loading ? (
        <h3>Loading, please wait</h3>
      ) : (
        <>
          <p>Find countries: </p>
          <input value={search} onChange={handleChangeSearch} />
          {search === "" && <p>Search a country to display its information</p>}
          {error && <h3>There was an error: {error}</h3>}
          <Countries
            countries={countries}
            country={country}
            handleShowCountry={handleShowCountry}
            weather={weather}
          />
        </>
      )}
    </>
  );
}

export default App;
