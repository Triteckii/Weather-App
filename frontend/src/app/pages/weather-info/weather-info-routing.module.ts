import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherInfoComponent } from './weather-info.component';

const routes: Routes = [
  {
    path:'',
    component: WeatherInfoComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherInfoRoutingModule { }
