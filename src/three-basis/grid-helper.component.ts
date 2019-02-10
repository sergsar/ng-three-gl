import { Component, Input, OnInit } from '@angular/core';
import { GridHelper, Object3D } from 'three';

@Component({ selector: 'three-grid-helper', template: ''})
export class GridHelperComponent implements OnInit {

    @Input()
    public parent: Object3D;

    @Input()
    public set visible(value: boolean) {
        console.log(value);
        if(this.gridObject) {
            this.gridObject.visible = value;
        }
    }

    private gridObject: Object3D;

    public ngOnInit(): void {
        if(this.parent) {
            this.gridObject = new GridHelper(2, 10);
            this.parent.add(this.gridObject);
        }
    }
}
