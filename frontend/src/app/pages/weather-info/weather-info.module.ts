import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherInfoRoutingModule } from './weather-info-routing.module';
import { WeatherInfoComponent } from './weather-info.component';
import { ButtonsModule, ControlsModule, IndicatorsModule } from 'app/shared';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [WeatherInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    WeatherInfoRoutingModule,
    ControlsModule,
    IndicatorsModule,
    ButtonsModule
  ]
})
export class WeatherInfoModule { }
