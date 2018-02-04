import {AfterContentInit, Component} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({ templateUrl: './map.component.html', styleUrls: ['./map.component.css'] })
export class MapComponent implements AfterContentInit {
  ngAfterContentInit() {

    const mapBoxGl = mapboxgl;
    mapBoxGl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
    const map = new mapBoxGl.Map({ container: 'map', style: 'mapbox://styles/mapbox/streets-v9', center: [-74.50, 40], zoom: 9});
  }
}
