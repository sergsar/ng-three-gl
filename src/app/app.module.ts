import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {ThreeBasisModule} from '../three-basis/three-basis.module';
import {DataProviderService} from './data.provider.service';
import {HttpClientModule} from '@angular/common/http';
import {ComponentsDefaultModule} from '../components-default/components-default.module';
import {ComponentsElementaryModule} from '../components-elementary/components-elementary.module';
import {CubeComponent} from './cube.component';
import {PageNotFoundComponent} from './not-found.component';
import {AppRoutingModule} from './app-routing.module';




@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, ThreeBasisModule, HttpClientModule, ComponentsDefaultModule, ComponentsElementaryModule ],
  declarations: [ AppComponent, CubeComponent, PageNotFoundComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ DataProviderService ] // TODO: delete, only needed for dataprov tests
})
export class AppModule { }
