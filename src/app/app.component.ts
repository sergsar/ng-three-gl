import {Component, OnInit} from '@angular/core';
import {DataProviderService} from './data.provider.service';
import {HttpHeaders} from '@angular/common/http';

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class AppComponent implements OnInit {
    private data: Object;

    constructor (private dataProviderService: DataProviderService) {} // TODO: delete after data providers completed, only needed for data tests

    ngOnInit() {
        const headers = new HttpHeaders({ ['X-Tenant-Id']: 'ng_three' });
        const options = {headers: headers};
        const url = 'https://presentation.idvp.net/cube/file/cube.json';
        this.dataProviderService.getObservable(url, options).subscribe(p => this.data = p);
    }

    public getData(): Object {
      return this.data;
    }
}
