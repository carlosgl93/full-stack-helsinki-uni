import axios from "axios";

const apikey = process.env.REACT_APP_WEATHER_API_KEY;

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`;

const getWeather = (latlng) => {
  const [lat, lng] = latlng;
  const request = axios.get(
    `${baseUrl}lat=${lat}&lon=${lng}&units=metric&appid=${apikey}`
  );
  return request.then((res) => res.data);
};

export default {
  getWeather,
};
