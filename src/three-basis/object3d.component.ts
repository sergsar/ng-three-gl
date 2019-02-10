import { Input } from '@angular/core';
import { Group } from 'three';
import { GroupProvider } from './group-provider.service';

export abstract class Object3dComponent {

    @Input()
    public set positionX(value: number) {
        this.group.position.x = value;
    }
    @Input()
    public set positionY(value: number) {
        this.group.position.y = value;
    }
    @Input()
    public set positionZ(value: number) {
        this.group.position.z = value;
    }
    @Input()
    public set rotationX(value: number) {
        this.group.rotation.x = value;
    }
    @Input()
    public set rotationY(value: number) {
        this.group.rotation.y = value;
    }
    @Input()
    public set rotationZ(value: number) {
        this.group.rotation.z = value;
    }
    @Input()
    public set scaleX(value: number) {
        this.group.scale.x = value;
    }
    @Input()
    public set scaleY(value: number) {
        this.group.scale.y = value;
    }
    @Input()
    public set scaleZ(value: number) {
        this.group.scale.z = value;
    }

    public get Group() : Group {
        return this.group;
    }

    private readonly group: Group;

    protected constructor(groupProvider: GroupProvider) {
        this.group =  groupProvider.Group;
    }
}
