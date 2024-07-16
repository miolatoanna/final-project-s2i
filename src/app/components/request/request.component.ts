import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      departureCode: ['', Validators.required],
      destinationCode: ['', Validators.required],
      passengers: ['', [Validators.required, Validators.min(1)]],
      flightClass: ['', Validators.required],
      currency: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }


}
