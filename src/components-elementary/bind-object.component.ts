import {OnInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {BindItemComponent} from './bind-item.component';

@Component({ selector: 'bind-object', template: '<ng-content></ng-content>' })
export class BindObjectComponent {

    @Input()
    name: string;

    @ContentChildren(BindItemComponent)
    private items: QueryList<BindItemComponent> = new QueryList<BindItemComponent>();

    @ContentChildren(BindObjectComponent)
    private objects: QueryList<BindObjectComponent> = new QueryList<BindObjectComponent>();

    // ngOnInit() {
    //     console.log(this.name);
    // }

    public getItems(): QueryList<BindItemComponent> {
        return this.items;
    }

    public getObjects(): QueryList<BindObjectComponent> {
        return this.objects;
    }
}
