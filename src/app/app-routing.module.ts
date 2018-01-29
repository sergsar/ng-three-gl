import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CubeComponent} from './cube.component';
import {PageNotFoundComponent} from './not-found.component';

const appRoutes: Routes = [
  { path: 'cube', component: CubeComponent },
  { path: '', redirectTo: '/cube', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({ imports: [RouterModule.forRoot(appRoutes)], exports: [RouterModule] })
export class AppRoutingModule { }
