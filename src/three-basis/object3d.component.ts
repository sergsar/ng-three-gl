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
        this.group.rotation.x = value * Math.PI / 180.0;
    }
    @Input()
    public set rotationY(value: number) {
        this.group.rotation.y = value * Math.PI / 180.0;
    }
    @Input()
    public set rotationZ(value: number) {
        this.group.rotation.z = value * Math.PI / 180.0;
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

    @Input()
    public set CastShadow(value: boolean) {
        this.setCastShadow(value);
    }

    @Input()
    public set ReceiveShadow(value: boolean) {
        this.setReceiveShadow(value);
    }

    public get Group() : Group {
        return this.group;
    }

    protected castShadow: boolean;
    protected receiveShadow: boolean;

    private readonly group: Group;

    protected constructor(groupProvider: GroupProvider) {
        this.group =  groupProvider.Group;
    }

    protected setCastShadow(value: boolean) : void {
        this.castShadow = value;
    }

    protected setReceiveShadow(value: boolean) : void {
        this.receiveShadow = value;
    }
}
