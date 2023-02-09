export type Weather = {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  pressure: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  clouds: string;
  visibility: number;
  iconUrl: string;
  order: number;
};

export type City = {
  city: string;
  order: number;
};

export interface RootState {
  weatherData: Weather[];
  cities: City[];
  isGeoOn: boolean;
  isData: boolean;
}
