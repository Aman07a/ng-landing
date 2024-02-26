import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor() {}

  getCurrentLocation() {
    window.navigator.geolocation.getCurrentPosition((position) => {
      this.position = position;
      getForecastData();
    });
  }
}
