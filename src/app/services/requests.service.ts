import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environments} from "../../environments/environments";
import {Observable} from "rxjs";
import {IAirportData, IResult} from "../models/interfaces";
import {API_KEY, API_KEY_AIRPORT_GAP} from "../../../api_config";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private baseUrl: string = environments.server_url;
  private apiKey: string = API_KEY;

  private baseUrlAirportGap: string = environments.server_url_airport_gap;
  private apiKeyAirportGap: string = API_KEY_AIRPORT_GAP;

  constructor(private http: HttpClient) {}

  /**
   * Api to calculate flight footprint based on some parameters below
   * @param originCode departure airport
   * @param destinationCode destination airport
   * @param cabinClass cabin fligh class
   * @param currencies currency selected, multiple values
   */
  getFootprint(
    originCode: string,
    destinationCode: string,
    cabinClass: string,
    currencies: string[]
  ): Observable<IResult> {

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.apiKey),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let params = new HttpParams();
    params = params.append('segments[0][origin]', originCode.toString());
    params = params.append('segments[0][destination]', destinationCode.toString());
    params = params.append('cabin_class', cabinClass.toString());
    currencies.forEach((currency, index) => {
      params = params.append(`currencies[${index}]`, currency.toString());
    });
    return this.http.get<IResult>(`${this.baseUrl}/v1/flight_footprint`, {headers, params});
  }

  /**
   * API to get data from json file from assets
   */
  getAirportsFromJson(): Observable<any[]> {
    return this.http.get<any[]>('../../assets/airport_code.json');
  }

  /**
   * API to get data of airport selected by id
   * @param id code of airport selected
   */
  getAirportsData(id: string): Observable<IAirportData> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer  ' ,
      'Content-Type': 'application/json'
    });
    return this.http.get<IAirportData>(`${this.baseUrlAirportGap}/airports/${id}`, {headers});
  }

}
