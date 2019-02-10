import {Component, OnInit} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Component({ templateUrl: './cube.component.html', styleUrls: ['./cube.component.scss'] })
export class CubeComponent implements OnInit {
  private data: Object;

  ngOnInit() {
    const headers = new HttpHeaders({ ['X-Tenant-Id']: 'ng_three' });
    const options = {headers: headers};
    const url = 'assets/data/cube/cube.json';
    // this.dataProviderService.getObservable(url, options).subscribe(p => this.data = p, () => this.data = {});
  }

  public getData(): Object {
    return this.data;
  }
}
