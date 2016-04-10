import {customElement} from 'aurelia-framework';
import {inject}        from 'aurelia-framework';
import {HttpClient}    from 'aurelia-http-client';
import {MirrorConfig}  from '../mirror-config';
import {Geolocation}   from './geolocation';

@inject(HttpClient, MirrorConfig, Geolocation)
@customElement('forecast')
export class Forecast {
  constructor(http, config, geo) {
    this.http = http;
    this.geo = geo;

    // Config variables
    this.key = config.forecast.key;
    this.lang = config.forecast.lang;
    this.units = config.forecast.units;

    this.latitude = '';
    this.longitude = '';

    // Mapping of Forecast API icon-names to icon classes
    this.weatherIcons = {
      'clear-day': 'wi-forecast-io-clear-day',
      'clear-night': 'wi-forecast-io-clear-night',
      'rain': 'wi-forecast-io-rain',
      'snow': 'wi-forecast-io-snow',
      'sleet': 'wi-forecast-io-sleet',
      'wind': 'wi-forecast-io-wind',
      'fog': 'wi-forecast-io-fog',
      'cloudy': 'wi-forecast-io-cloudy',
      'partly-cloudy-day': 'wi-forecast-io-partly-cloudy-day',
      'partly-cloudy-night': 'wi-forecast-io-partly-cloudy-night',
      'hail': 'wi-forecast-io-hail',
      'thunderstorm': 'wi-forecast-io-thunderstorm',
      'tornado': 'wi-forecast-io-tornado'
    };

    this.apiUrl = '';
    this.weather = {};
    this.isLoading = true;
  }

  // Get weather and update every 10 minutes
  attached() {
    this.geo.getLocation().then(crd => {
      this.getWeather(crd.coords);
      setInterval(() => this.getWeather(crd.coords), 600000);
    });
  }

  // Get weather information
  getWeather(crd) {
    this.apiUrl = `https://api.forecast.io/forecast/${this.key}/${crd.latitude},${crd.longitude}?lang=${this.lang}&units=${this.units}`;

    return this.http.jsonp(this.apiUrl, 'callback')
      .then(forecast => {
        this.weather = forecast.response;
        this.setWeatherIconClasses(this.weather);
        this.isLoading = false;
      });
  }

  // Change the weather icon classes.
  setWeatherIconClasses(weather) {
    weather.currently.icon = this.weatherIcons[weather.currently.icon];
    for (let day of weather.daily.data) {
      day.icon = this.weatherIcons[day.icon];
    }
  }
}
