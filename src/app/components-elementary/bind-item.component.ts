import {Component, Input} from '@angular/core';

@Component({ selector: 'bind-item', template: '' })
export class BindItemComponent {

    @Input()
    key: string;

    @Input()
    value: string;
}
