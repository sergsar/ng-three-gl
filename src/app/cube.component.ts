import {Component, OnInit} from '@angular/core';
import {DataProviderService} from './data.provider.service';
import {HttpHeaders} from '@angular/common/http';

@Component({ templateUrl: './cube.component.html', styleUrls: ['./cube.component.css'] })
export class CubeComponent implements OnInit {
  private data: Object;

  constructor (private dataProviderService: DataProviderService) {} // TODO: delete after data providers completed, only needed for data tests

  ngOnInit() {
    const headers = new HttpHeaders({ ['X-Tenant-Id']: 'ng_three' });
    const options = {headers: headers};
    const url = 'https://presentation.idvp.net/cube/file/cube.json';
    this.dataProviderService.getObservable(url, options).subscribe(p => this.data = p, () => this.data = {});
  }

  public getData(): Object {
    return this.data;
  }
}
