import { Injectable } from '@angular/core';
import { Group } from 'three';

@Injectable()
export class GroupProvider {
    private group: Group;

    constructor() {
        this.group = new Group();
    }

    public get Group(): Group {
        return this.group;
    }
}
