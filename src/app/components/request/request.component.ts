import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestsService} from "../../services/requests.service";
import {IRequest, IResult} from "../../models/interfaces";


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit{
  form: FormGroup;
  response: IResult | null = null;

  constructor(private fb: FormBuilder, private service: RequestsService) {
    this.form = this.fb.group({
      originCode: ['', Validators.required],
      destinationCode: ['', Validators.required],
      passengers: ['', [Validators.required, Validators.min(1)]],
      cabinClass: ['', Validators.required],
      currency: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    if (this.form.valid) {
      const { originCode, destinationCode, cabinClass, currency } = this.form.value;
      this.service.getFootprint(
        originCode,
        destinationCode,
        cabinClass,
        [currency]
      )
        .subscribe((res) => {
          console.log('response', res);
        })
    }
  }


}
