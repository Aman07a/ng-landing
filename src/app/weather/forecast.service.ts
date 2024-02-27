import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { filter, map, mergeMap, toArray, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getForecast(): Observable<any[]> {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'metric')
          .set('appid', environment.api_key);
      }),
      switchMap((params) =>
        this.http.get<OpenWeatherResponse>(this.url, { params })
      ),
      map((response) => response.list),
      mergeMap((value: any) => value),
      filter((value: any, index: number) => index % 8 === 0),
      map((value) => ({
        dateString: value.dt_txt,
        temp: value.main.temp,
      })),
      toArray()
    );
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    });
  }
}
