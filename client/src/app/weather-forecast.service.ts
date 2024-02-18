import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  private apiBaseUrl = 'https://localhost:7283';

  constructor(private httpClient: HttpClient) { }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getForecast(): Observable<any> {
    const url = `${this.apiBaseUrl}/weatherforecast`;
    return this.httpClient.get(url);
  }
}
