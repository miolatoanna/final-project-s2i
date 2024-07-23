import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestsService} from "../../services/requests.service";
import {IResult} from "../../models/interfaces";

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
  originAirportObj = {
    id: '',
    name: ''
  }
  destinationAirportObj = {
    id: '',
    name: ''
  }

  currencies = [
    { label: 'EUR', value: 'EUR' },
    { label: 'USD', value: 'USD' },
    { label: 'SEK', value: 'SEK' },
    { label: 'NOK', value: 'NOK' }
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
      passengers: ['', [Validators.required, Validators.min(1)]],
      cabinClass: ['', Validators.required],
      currency: [[], Validators.required]
    });
  }

  ngOnInit() {
  }

  getAirportOrigin() {
    const originId = this.form.get('originCode')?.value;
    this.service.getAirportsData(originId).subscribe((res) => {
      this.originAirportObj.id = res.data.id;
      this.originAirportObj.name = res.data.attributes.name
      this.form.patchValue({
        originCode: this.originAirportObj.name
      })
    })
  }

  getAirportDestination() {
    const destinationId = this.form.get('destinationCode')?.value;
    this.service.getAirportsData(destinationId).subscribe((res) => {
      this.destinationAirportObj.id = res.data.id;
      this.destinationAirportObj.name = res.data.attributes.name;
      this.form.patchValue({
        destinationCode: this.destinationAirportObj.name
      })
    })
  }



  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.result = null;
      const {cabinClass, currency, passengers} = this.form.value;
      this.service.getFootprint(
        this.originAirportObj.id,
        this.destinationAirportObj.id,
        cabinClass,
        [currency]
      )
        .subscribe((res: IResult) => {
          this.result = res;
          this.isLoading = false;
          this.singleFootprint(passengers, res.footprint);
        }, (error) => {
          console.error('Error fetching footprint', error);
          this.isLoading = false;
        });
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
