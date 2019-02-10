import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Component({ templateUrl: './cube.component.html', styleUrls: ['./cube.component.scss'] })
export class CubeComponent implements OnInit, OnDestroy {

  public get Height(): number {
    return this.height;
  }

  public get Width(): number {
    return this.width;
  }

  private data: Object;

  private width = 100;
  private height = 100;

  constructor(private elementRef: ElementRef) {}

  public ngOnInit() {
    const headers = new HttpHeaders({ ['X-Tenant-Id']: 'ng_three' });
    const options = {headers: headers};
    const url = 'assets/data/cube/cube.json';
    // this.dataProviderService.getObservable(url, options).subscribe(p => this.data = p, () => this.data = {});

    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  public ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

  public getData(): Object {
    return this.data;
  }

  private onResize = (): void => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}
