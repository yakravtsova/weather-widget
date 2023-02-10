import { iconPath, iconExtension } from "./constants";
import { Weather } from "@/store/types";

const degToCompass = (deg: number) => {
  const val: number = Math.floor(deg / 22.5 + 0.5);
  const arr: string[] = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

const dewPoint = (t: number, h: number): number => {
  const a: number = 17.27;
  const b: number = 237.7;
  const f = (t: number, h: number): number => {
    return (a * t) / (b + t) + Math.log(h / 100);
  };
  return Math.round((b * f(t, h)) / (a - f(t, h)));
};

const getWeather = (data: any): Weather => {
  const cloudsData = data.weather[0].description;
  const formattedCloudsData =
    cloudsData.charAt(0).toUpperCase() + cloudsData.slice(1);
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(temp),
    feelsLike: Math.round(data.main.feels_like),
    pressure: data.main.pressure,
    humidity: humidity,
    windSpeed: data.wind.speed,
    windDirection: degToCompass(data.wind.deg),
    clouds: formattedCloudsData,
    visibility: Math.floor(data.visibility / 100) / 10,
    iconUrl: `${iconPath}${data.weather[0].icon}${iconExtension}`,
    dewPoint: dewPoint(temp, humidity),
    daylight: Math.floor((data.sys.sunset - data.sys.sunrise) / 60),
    isOk: true,
    order: 0,
  };
};

export { degToCompass, dewPoint, getWeather };
