export interface ISegments {
  origin: string,
  destination: string,
}

export interface IOffset {
  amount: number,
  currency: 'EUR' | 'USD' | 'SEK' | 'NOK',
  offset_url: string,
  locale: string
}

export interface IRequest {
  segments: ISegments[],
  cabin_class: 'economy' | 'premium_economy' | 'business' | 'first',
  currencies: 'EUR' | 'USD' | 'SEK' | 'NOK',
}

export interface IResult {
  footprint: number,
  offset_prices: IOffset[]
}


export interface IAirportData {
  data: {
    attributes: IAirportAttributes;
    id: string;
    type: string;
  }
}

export interface IAirportAttributes {
  altitude: number;
  city: string;
  country: string;
  iata: string;
  icao: string;
  latitude: string;
  longitude: string;
  name: string;
  timezone: string;
}


