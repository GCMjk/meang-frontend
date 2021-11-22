import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker-legal-age',
  templateUrl: './date-picker-legal-age.component.html',
  styleUrls: ['./date-picker-legal-age.component.scss']
})
export class DatePickerLegalAgeComponent {

  CURRENTDAY = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };
  minDate: NgbDateStruct = {
    year: this.CURRENTDAY.year - 100,
    month: this.CURRENTDAY.month,
    day: this.CURRENTDAY.day
  };
  maxDate: NgbDateStruct = {
    year: this.CURRENTDAY.year - 18,
    month: this.CURRENTDAY.month,
    day: this.CURRENTDAY.day
  };

  model: NgbDateStruct = this.maxDate;

  @Input() parentForm: FormGroup;
  @Input() formControlname: string;
  @Input() inputPlaceholder: string;
  @Input() formLabel: string;

  @Output() newDate = new EventEmitter<NgbDateStruct>();

  selectDateChange() {
    //console.log('get date by date-picker', this.model);
    this.newDate.emit(this.model);
  }

}
