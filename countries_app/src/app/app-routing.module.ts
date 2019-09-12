import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { LoadingComponent } from './loading/loading.component';

const routes: Routes = [
  {
    path: 'country',
    component: CountryListComponent
  }, {
    path: '',
    component: LoadingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(){}
}

