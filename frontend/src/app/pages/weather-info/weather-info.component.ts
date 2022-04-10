import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'app/services/storage/storage.service';
import { markFormGroupTouched, regex, regexErrors } from 'app/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { WeatherService } from 'app/services/storage/weather.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
})
export class WeatherInfoComponent implements OnInit {
  showSpinner = false;
  form: FormGroup;
  regexErrors = regexErrors;
  zipCodes: string[] = [];
  testArr: Array<any> = [];
  testArr2: Array<any> = [];
  fomValue: number;
  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private snackBar: MatSnackBar,
    private weather: WeatherService
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
      this.zipCodes.map(el => {
        this.weather.getGeocode(el.toString()).pipe(
          map(data => {
            console.log(222323, data);
            this.weather.getWeatherByName(data.lat, data.lon).pipe(
              map(data => {
                console.log(2222, data);
                this.testArr2.push(data)
              })
            ).subscribe()
          })
        ).subscribe()
      })
      this.getArrItems();
      console.log(12322, this.testArr2);
      

    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      markFormGroupTouched(this.form);
    } else {
      this.fomValue = Number(this.form.value.code);

      if (this.zipCodes.includes(this.form.value.code) === true) {
        this.snackBar.open('This number already exists ', 'Close', {
          panelClass: 'action-error',
        });
      } else {
        this.zipCodes.push(this.form.value.code);

        this.storage.set('ZipCodes', JSON.stringify(this.zipCodes));

        this.snackBar.open('You have successfully add zipcode ', 'Close', {
          panelClass: 'action-success',
        });
        this.weather.getGeocode(this.form.value.code).pipe(
          map(data => {

            this.weather.getWeatherByName(data.lat, data.lon).pipe(
              map(data => {
                console.log(444413, data);
                this.testArr2.push(data)
              })
            ).subscribe()
            
          })
        ).subscribe()
        this.form.reset();
      }
    }
  }

  getArrItems() {
    this.testArr.map(el => {
      this.weather.getWeatherByName(el.lat, el.lon).pipe(
        map(data => {
          console.log(13, data);
          this.testArr2.push(data)
        })
      ).subscribe()
    })
  }
  getCodes(){
    this.zipCodes.map(el => {
      this.weather.getGeocode(el.toString()).pipe(
        map(data => {
          console.log(134, data);
          this.testArr.push(data)
        })
      ).subscribe()
    })
  }
  remove(){

  }
}
