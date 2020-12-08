import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
export interface FormItem {
  type: string;
  name: string;
  value: string | number;
  label: string;
  min: number;
  max: number;
}

export interface ValidateOption {
  required: string;
  min: string;
  max: string;
}

export function initialForm(type: string, name: string, value?: string | number, label?: string, min?: number, max?: number): FormItem {
  return {type, name, value, label, min, max};
}
@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {
  form: FormGroup;
  // tslint:disable-next-line:no-input-rename
  @Input('validate') validate: ValidateOption;
  // tslint:disable-next-line:no-input-rename
  @Input('item') item: FormItem;
  @Output() changeForm = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      item: new FormControl(
        this.item.value,
        [
          Validators.required,
          Validators.minLength(this.item.min),
          Validators.maxLength(this.item.max)
        ])
    });
  }
  onChange(): void {
    this.changeForm.emit({type: this.item.type, value: this.form.value.item});
  }
}
