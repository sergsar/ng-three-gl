export interface EventHandler {
    add(handler: Function): void;
    remove(handler: Function): void;
}

export class EventDispatcher implements EventHandler {
    private handlers: Function[] = [];

    public add(handler: Function): void {
        this.handlers.push(handler);
    }

    public remove(handler: Function): void {
        this.handlers = this.handlers.filter(h => h !== handler);
    }

    public dispatch(...argArray: any[]): void {
        this.handlers.forEach(h => h.call(this, ...argArray));
    }
}
