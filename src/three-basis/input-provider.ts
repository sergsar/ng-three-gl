import { Injectable } from '@angular/core';
import { InputEvent } from './input-event';

@Injectable()
export class InputProvider {

    public get ClientX(): number {
        return this.clientX;
    }

    public get ClientY(): number {
        return this.clientY;
    }

    private listeners: {} = {};

    private clientX: number = 0;
    private clientY: number = 0;

    public addEventListener(type: InputEvent, listener: (e: Event) => void): void {
        if(!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(listener);
    }

    public removeEventListener(type: InputEvent, listener: any): void {
        const listeners = this.listeners[type];
        if(!listeners) {
            return;
        }
        const index = listeners.indexOf(listener);
        if(index < 0) {
            return;
        }
        listeners.splice(index, 1);
    }

    public processInputEvent(inputEvent: InputEvent, event: Event): void {
        const mouseEvent = event as MouseEvent;
        if(mouseEvent.clientX && mouseEvent.clientY) {
            this.clientX = mouseEvent.clientX;
            this.clientY = mouseEvent.clientY;
        }
        const listeners: ((e: Event) => void)[] = this.listeners[inputEvent];
        if(!listeners) {
            return;
        }
        listeners.forEach(o => o(event));
    }
}
