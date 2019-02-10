import { Injectable, InjectFlags, Injector, OnDestroy, Optional, SkipSelf } from '@angular/core';
import { Group } from 'three';

@Injectable()
export class GroupProvider implements OnDestroy {

    public get Group(): Group {
        return this.group;
    }

    private readonly group: Group;

    constructor(@SkipSelf() @Optional() groupProvider: GroupProvider) {

        this.group = new Group();
        if(groupProvider) {
            groupProvider.Group.add(this.group);
        }
    }

    public ngOnDestroy(): void {
        this.group.remove(...this.group.children);
    }
}
