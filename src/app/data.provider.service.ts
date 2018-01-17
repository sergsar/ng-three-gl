import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataProviderService {

    constructor (private httpClient: HttpClient) { }


    public getObservable<T>(url: string, options?: {}): Observable<T>;

    public getObservable(url: string, options?: {}): Observable<Object> {
        return this.httpClient.get(url, options);
    }

    // public subscribe(url: string, next?: (value: T) => void, options?: Map): void {
    //
    // }

    public getPromise<T>(url: string, options?: {}): Promise<T>;

    public getPromise(url: string, options?: {}): Promise<Object> {
        return this.getObservable(url, options).toPromise();
    }


    // example binary data: await getAwait(textureUrl, {responseType: 'arraybuffer'});
    public async getAwait<T>(url: string, options?: {}): Promise<T>;

    public async getAwait(url: string, options?: {}): Promise<Object> {
        let response;
        try {
            response = await this.getPromise(url, options);
        } catch (e) {
            throw new Error(e);
        }
        return response;
    }
}
