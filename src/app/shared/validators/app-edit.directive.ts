import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { appEditValidator } from './app-edit-validators';

@Directive({
  selector: '[appEdit]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AppEditDirective,
      multi: true
    }
  ]
})

export class AppEditDirective implements Validator, OnChanges{

  @Input() appEdit: string[] = [];

  validator: ValidatorFn = appEditValidator()
  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentEditChanges = changes["appEdit"];
    if (currentEditChanges) {
      this.validator= appEditValidator()

    }
  }

}
