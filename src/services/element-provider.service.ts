import {Injectable} from '@angular/core';

@Injectable()
export class ElementProviderService {
    public getImage(url: string): Promise<Object> {
        return new Promise((resolve, reject) => {
            const image = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' );
            image.setAttribute('src', url);
            image.setAttribute('crossOrigin', 'Anonymous');
            image.addEventListener( 'load', () => resolve(image), false );
            image.addEventListener( 'error', () => reject(new Error('Image provider service error')), false );
        });
    }
}
