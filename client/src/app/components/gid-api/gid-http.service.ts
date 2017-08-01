import {Injectable} from '@angular/core';
import {Http, RequestOptions, RequestOptionsArgs, ConnectionBackend, XHRBackend, Headers, Request, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class GidHttpService extends Http {

    constructor(protected backend: ConnectionBackend, protected defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        let token = window.localStorage['api-token'];

        if (typeof url === 'string') {
            if (!options) {
                options = {headers: new Headers()};
            }
            options.headers.set('Authorization', `Bearer ${token}`);
        } else {
            url.headers.set('Authorization', `Bearer ${token}`);
        }

        return super.request(url, options).catch(this.catchAuthError(this));
    }

    private catchAuthError (self: GidHttpService) {
        return (res: Response) => {
            return Observable.throw(res);
        }
    }

    static newInstance(xhrBackend : XHRBackend, requestOptions : RequestOptions) : Http {
        return new GidHttpService(xhrBackend, requestOptions);
    }
}
