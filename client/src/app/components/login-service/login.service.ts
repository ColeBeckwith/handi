import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {User} from "../../interfaces/user";

@Injectable()
export class LoginService {
    userInfo: User;

    constructor(private http: Http,
                private router : Router) {
    }

    saveToken(token) {
        window.localStorage['api-token'] = token;
    }

    getToken() {
        return window.localStorage['api-token'];
    }

    authorizeUser() {
        if (!this.isLoggedIn()) {
            this.router.navigate(['/login']);
        }
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

            return payload.email;
        }
    }

    registerUser(user) {
        return new Promise((resolve, reject) => {
            this.http.post('/api/users/register', user).subscribe((data: any) => {
                this.saveToken(JSON.parse(data._body).token);
                resolve();
            }, (error) => {
                let message = '';
                try {
                    message = JSON.parse(error._body).message;
                } catch(e) {
                    message = 'An error occurred. Please try again.'
                }
                reject(message);
            });
        })

    }

    logIn(user) {
        return new Promise((resolve, reject) => {
            this.http.post('/api/users/login', user).subscribe((data: any) => {
                this.saveToken(JSON.parse(data._body).token);
                this.getUserInfoFromServer();
                resolve();
            }, (error) => {
                console.log(error);
                reject(JSON.parse(error._body).message);
            });
        });
    }

    logOut() {
        window.localStorage.removeItem('api-token');
        this.router.navigate(['/login']);
    }

    getUserInfoFromServer() {
        return new Promise<any> ((resolve, reject) => {
            if (this.isLoggedIn()) {
                const token = this.getToken();
                const payload = JSON.parse(window.atob(token.split('.')[1]));
                this.http.get('/api/users/user-by-id/' + payload._id).subscribe((data : any) => {
                    this.userInfo = JSON.parse(data._body);
                    resolve(data);
                }, (err) => {
                    reject('Error in Retrieving User Info.');
                })
            } else {
                reject('User is not logged in.');
            }
        });

    }

}
