import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscribable, Unsubscribable } from 'rxjs';
import { EventDispatcher, EventHandler } from './event-dispatcher';
import { InputEvent } from './input-event';
import { InputProvider } from './input-provider';


@Component({
    selector: 'three-canvas-controller',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputProvider],
})
export class CanvasControllerComponent implements OnChanges, OnDestroy {

    @Input()
    public set height(value: number) {
        this.canvas.height = value;
    }

    @Input()
    public set width(value: number) {
        this.canvas.width = value;
    }

    public get Canvas() : HTMLCanvasElement {
        return this.canvas;
    }

    public get Resize(): EventHandler {
        return this.resize;
    }

    @Input()
    public set dragOver(value: Subscribable<any>) {
        if(this.dragOverSubscription) {
            this.dragOverSubscription.unsubscribe();
        }
        this.dragOverSubscription = value.subscribe((e) => this.onInputEvent(InputEvent.DragOver, e));
    }

    @Input()
    public set drop(value: Subscribable<any>) {
        if(this.dropSubscription) {
            this.dropSubscription.unsubscribe();
        }
        this.dropSubscription = value.subscribe((e) => this.onInputEvent(InputEvent.Drop, e));
    }

    @Input()
    public set dragLeave(value: Subscribable<any>) {
        if(this.dragLeaveSubscription) {
            this.dragLeaveSubscription.unsubscribe();
        }
        this.dragLeaveSubscription = value.subscribe((e) => this.onInputEvent(InputEvent.DragLeave, e));
    }

    @Input()
    public set click(value: Subscribable<any>) {
        if(this.clickSubscription) {
            this.clickSubscription.unsubscribe();
        }
        this.clickSubscription = value.subscribe((e) => this.onInputEvent(InputEvent.Click, e));
    }

    @Input()
    public set mouseMove(value: Subscribable<any>) {
        if(this.mouseMoveSubscription) {
            this.mouseMoveSubscription.unsubscribe();
        }
        this.mouseMoveSubscription = value.subscribe((e) => this.onInputEvent(InputEvent.MouseMove, e));
    }

    @Input()
    public set mouseDown(value: Subscribable<any>) {
        if(this.mouseDownSubscription) {
            this.mouseDownSubscription.unsubscribe();
        }
        this.mouseDownSubscription = value.subscribe((e) => this.onInputEvent(InputEvent.MouseDown, e));
    }

    private dragOverSubscription: Unsubscribable;
    private dropSubscription: Unsubscribable;
    private dragLeaveSubscription: Unsubscribable;
    private clickSubscription: Unsubscribable;
    private mouseMoveSubscription: Unsubscribable;
    private mouseDownSubscription: Unsubscribable;

    private readonly canvas: HTMLCanvasElement;

    private readonly resize = new EventDispatcher();

    constructor(elementRef: ElementRef,
                private sceneInputProvider: InputProvider,
    ) {
        this.canvas = elementRef.nativeElement.parentElement.getElementsByTagName('canvas')[0];
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.resize.dispatch(this.canvas.width, this.canvas.height);
    }

    public ngOnDestroy(): void {
        this.dragOverSubscription.unsubscribe();
    }

    private onInputEvent(inputEvent: InputEvent, e: Event): void {
        this.sceneInputProvider.processInputEvent(inputEvent, e);
    }
}
