import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class LoginService {

    constructor(private http: Http) {
    }

    saveToken(token) {
        window.localStorage['api-token'] = token;
    }

    getToken() {
        return window.localStorage['api-token'];
    }

    isLoggedIn() {
        const token = this.getToken();
        if (token) {
            const payload = JSON.parse(window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    currentUser() {
        if (this.isLoggedIn()) {
            const token = this.getToken();
            const payload = JSON.parse(window.atob(token.split('.')[1]));

            // TODO whatever is being used to identify the user should be substituted here.
            return payload.firstName;
        }
    }

    registerUser(user) {
        return new Promise((resolve, reject) => {
            this.http.post('/api/users/register', user).subscribe((data: any) => {
                this.saveToken(JSON.parse(data._body).token);
                resolve();
            }, (error) => {
                console.log(error);
                reject(JSON.parse(error._body).message);
            });
        })

    }

    logIn(user) {
        return new Promise((resolve, reject) => {
            this.http.post('/api/users/login', user).subscribe((data: any) => {
                this.saveToken(JSON.parse(data._body).token);
                resolve();
            }, (error) => {
                console.log(error);
                reject(JSON.parse(error._body).message);
            });
        });
    }

    logOut() {
        window.localStorage.removeItem('api-token');
    }

}
