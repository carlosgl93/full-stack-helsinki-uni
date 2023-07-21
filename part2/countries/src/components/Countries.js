import React from "react";

const Countries = ({ countries, country, handleShowCountry, weather }) => {
  if (!countries) return null;

  return (
    <div>
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
      {countries.length > 1 && countries.length < 10 && (
        <>
          <ul>
            {countries.map((c) => (
              <li
                key={c.name.common}
                style={{
                  display: "flex",
                  maxHeight: "1.5rem",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                <p>{c.name.common} </p>
                <button onClick={() => handleShowCountry(c)}>Show</button>
              </li>
            ))}
          </ul>
        </>
      )}
      {country && weather && (
        <>
          <h1>{country.name.common}</h1>
          <section>
            <ul>
              <li>Capital: {country.capital}</li>
              <li>Area: {country.area}</li>
            </ul>
          </section>
          <section>
            <h2>Languages</h2>
            <ul>
              {Object.values(country.languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
          </section>
          <section>
            <img
              src={country.flags.svg}
              alt={country.flags.alt}
              loading="lazy"
              style={{
                maxWidth: "300px",
              }}
            />
          </section>
          <section>
            <h2>Weather conditions:</h2>
            <img
              src={` https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather image"
            />
            <ul>
              <li>Temperature now: {weather.main.temp} °C</li>
              <li>Wind: {weather.wind.speed} m/s</li>
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default Countries;
