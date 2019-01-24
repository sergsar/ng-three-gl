import {
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
} from '@angular/core';
import { Group, Object3D } from 'three';
import { GroupProvider } from './group-provider.service';

export class Object3dComponent implements OnChanges {

    @Input()
    public positionX: number = 0.0;
    @Input()
    public positionY: number = 0.0;
    @Input()
    public positionZ: number = 0.0;
    @Input()
    public rotationX: number = 0.0;
    @Input()
    public rotationY: number = 0.0;
    @Input()
    public rotationZ: number = 0.0;
    @Input()
    public scaleX: number = 1.0;
    @Input()
    public scaleY: number = 1.0;
    @Input()
    public scaleZ: number = 1.0;

    private group: Group;


    constructor(private groupProvider: GroupProvider) {
        this.group = groupProvider.Group;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if(this.group === undefined){
            return;
        }

        this.group.position.set(this.positionX, this.positionY, this.positionZ);
        this.group.rotation.set(this.rotationX, this.rotationY, this.rotationZ);
        this.group.scale.set(this.scaleX, this.scaleY, this.scaleZ);
    }

    protected get Group() : Group {
        return this.group;
    }
}
