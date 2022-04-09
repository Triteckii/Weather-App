import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'app/services/storage/storage.service';
import { markFormGroupTouched, regex, regexErrors } from 'app/shared';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
})
export class WeatherInfoComponent implements OnInit {
  showSpinner = false;
  form: FormGroup;
  regexErrors = regexErrors;
  zipCodes: number[] = [];
  fomValue: number;
  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      code: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(5),
            Validators.pattern(regex.numbers),
          ],
        },
      ],
    });
    if (JSON.parse(this.storage.get('ZipCodes')) === null) {
      this.zipCodes = [];
    } else {
      this.zipCodes = JSON.parse(this.storage.get('ZipCodes'));
    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      markFormGroupTouched(this.form);
    } else {
      this.fomValue = Number(this.form.value.code);

      if (this.zipCodes.includes(this.fomValue) === true) {
        this.snackBar.open('This number already exists ', 'Close', {
          panelClass: 'action-error',
        });
      } else {
        this.zipCodes.push(this.fomValue);

        this.storage.set('ZipCodes', JSON.stringify(this.zipCodes));

        this.snackBar.open('You have successfully add zipcode ', 'Close', {
          panelClass: 'action-success',
        });

        this.form.reset();
      }
    }
  }
}
