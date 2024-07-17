import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environments} from "../../environments/environments";
import {Observable} from "rxjs";
import {IResult} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private baseUrl: string = environments.server_url;
  private apiKey: string = environments.api_key;

  constructor(private http: HttpClient) {}

  // /**
  //  * API to get information about flight footprint based on the entered parameters
  //  * @param body: origin airport code, destination airport code, cabin class, currency
  //  */

  getFootprint(
    originCode: string,
    destinationCode: string,
    cabinClass: string,
    currencies: string[]
  ): Observable<IResult> {

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.apiKey + ':'),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let params = new HttpParams();
    params = params.append('segments[0][origin]', originCode.toString());
    params = params.append('segments[0][destination]', destinationCode.toString());
    params = params.append('cabin_class', cabinClass.toString());
    currencies.forEach((currency, index) => {
      params = params.append(`currencies[${index}]`, currency.toString());
    });
    console.log('params', params)

    return this.http.get<IResult>(`${this.baseUrl}/v1/flight_footprint`, {headers, params});
  }
}
