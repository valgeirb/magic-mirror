import {customElement} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {MirrorConfig} from '../mirror-config';

@inject(HttpClient, MirrorConfig)
@customElement('forecast')
export class Forecast {
  constructor(http, config) {
    this.config = config;

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

    this.apiUrl = 'https://api.forecast.io/forecast/' +
      this.config.forecast.key + '/' +
      this.config.forecast.latLong + '?lang=' +
      this.config.forecast.lang + '&units=' +
      this.config.forecast.units;

    this.http = http;
    this.weather = {};
  }

  // Get weather and update every 10 minutes
  attached() {
    this.getWeather();
    setInterval(() => this.getWeather(), 600000);
  }

  // Get weather information
  getWeather() {
    return this.http.jsonp(this.apiUrl, 'callback')
      .then(forecast => {
        console.log('Testing', forecast.response);
        this.weather = forecast.response;
        this.setWeatherIconClasses();
      });
  }

  // Change the weather icon classes.
  setWeatherIconClasses() {
    this.weather.currently.icon = this.weatherIcons[this.weather.currently.icon];
    for (let day of this.weather.daily.data) {
      day.icon = this.weatherIcons[day.icon];
    }
  }
}
