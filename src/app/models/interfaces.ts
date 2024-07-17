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


