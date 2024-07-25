import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestsService} from "../../services/requests.service";
import {IAirportInfo, IResult} from "../../models/interfaces";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  form: FormGroup;
  result: IResult | null = null;
  isLoading: boolean = false;
  footprintPerPassenger: number = 0;
  airports: IAirportInfo[] = [];

  currencies = [
    {label: 'EUR', value: 'EUR'},
    {label: 'USD', value: 'USD'},
    {label: 'SEK', value: 'SEK'},
    {label: 'NOK', value: 'NOK'}
  ];
  cabin_classes = [
    {label: 'Economy', value: 'economy'},
    {label: 'Premium Economy', value: 'premium_economy'},
    {label: 'Business', value: 'business'},
    {label: 'First', value: 'first'}
  ]

  constructor(private fb: FormBuilder, private service: RequestsService) {
    this.form = this.fb.group({
      originCode: ['', Validators.required],
      destinationCode: ['', Validators.required],
      passengers: [null, [Validators.required]],
      cabinClass: ['', Validators.required],
      currency: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.service.getAirportsFromJson().subscribe((res) => {
      this.airports = res;
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.result = null;
      const {originCode, destinationCode, cabinClass, currency, passengers} = this.form.value;
      this.service.getFootprint(
        originCode,
        destinationCode,
        cabinClass,
        currency
      )
        .subscribe(
          {
            next: (res: IResult) => {
              this.result = res;
              this.isLoading = false;
              this.singleFootprint(passengers, res.footprint);
            },
            error: (error: any) => {
              console.error('Error', error);
              this.isLoading = false;
            }
          })

    }
  }

  singleFootprint(passengers: number, totalFootprint: number) {
    return this.footprintPerPassenger = Math.round(totalFootprint * passengers);
  }

  goBack() {
    this.form.reset();
    this.result = null;
  }
}
