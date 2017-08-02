import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class UsersService {

    constructor(private http: Http) {
    }

    getUserInfo(userId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('/api/users/user-by-id/' + userId).subscribe((data) => {
                resolve(data.json());
            }, (err) => {
                console.debug(err);
                reject(err);
            })
        });
    }

}
