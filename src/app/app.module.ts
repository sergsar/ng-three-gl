import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CubeComponent } from './cube.component';
import { PageNotFoundComponent } from './not-found.component';
import { AppRoutingModule } from './app-routing.module';
import {ThreeBasisModule} from '../three-basis/three-basis.module';
import {ThreeComponentsModule} from '../three-components/three-components.module';
import {ServicesModule} from '../services/services.module';
import {DataProviderService} from '../services/data.provider.service';
import {ElementProviderService} from '../services/element-provider.service';




@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, HttpClientModule, ThreeBasisModule, ThreeComponentsModule, ServicesModule ],
  declarations: [ AppComponent, CubeComponent, PageNotFoundComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DataProviderService, ElementProviderService]
})
export class AppModule { }
