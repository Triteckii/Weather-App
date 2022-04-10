import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly API_URL = environment.openWeather.url;
  private readonly GEO_URL = environment.openWeather.geocode;
  
  constructor(private readonly http: HttpClient) {}

  public getWeatherByName(lat: string, lon: string): Observable<any> {
    const params = new HttpParams().set('lat', lat).set('lon', lon);
    return this.http.get<any>(`${this.API_URL}/weather`, { params });
  }
  public getGeocode(city: string): Observable<any> {
    const params = new HttpParams().set('zip', city);
    return this.http.get<any>(`${this.GEO_URL}`, { params });
  }
}
