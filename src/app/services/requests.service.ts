import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environments} from "../../environments/environments";
import {Observable} from "rxjs";
import {IResult} from "../models/interfaces";
import {API_KEY} from "../../../api_config";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private baseUrl: string = environments.server_url;
  private apiKey: string = API_KEY;

  constructor(private http: HttpClient) {}

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
}
