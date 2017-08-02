import {Injectable} from '@angular/core';
import {Script} from "../../interfaces/script";
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ScriptsService {

    constructor(private http: Http) {
    }

    addScript(script: Script, scriptFile: File): Promise<any> {
        return new Promise((resolve, reject) => {

            // Create Script First.
            this.http.post('/api/scripts/add', script).subscribe((resp) => {
                let script: Script = resp.json();
                this.uploadScript(script, scriptFile).then((resp) => {
                    resolve(script);
                }, (err) => {
                    this.deleteScript(script);
                    // Should delete the script now.
                    reject('Unable to upload file');
                    console.debug(err);
                });
            }, (err) => {
                console.debug(err);
                reject(err);
            });
        });
    };

    uploadScript(script: Script, scriptFile: File): Promise<any> {
        return new Promise((resolve, reject) => {
            let fd = new FormData();
            fd.append('fileData', scriptFile);
            const headers = new Headers({});
            let options = new RequestOptions({headers});

            this.http.post(`/api/scripts/upload-script/${script._id}`, fd, options)
                .subscribe(
                    (data) => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
        });

    }

    getScript(scriptId): Promise<Script> {
        return new Promise((resolve, reject) => {
            this.http.get(`/api/scripts/${scriptId}`).subscribe((resp) => {
                resolve(resp.json().script);
            }, (err) => {
                console.debug(err);
                reject(err);
            });
        });
    }

    getMyScripts(): Promise<Array<Script>> {
        return new Promise((resolve, reject) => {
            this.http.get('/api/scripts').subscribe((resp) => {
                resolve(resp.json());
            }, (err) => {
                console.debug(err);
                reject(err);
            });
        });
    }

    deleteScript(script: Script): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(`/api/scripts/${script._id}`).subscribe((resp) => {
                resolve('Deleted');
            }, (err) => {
                console.debug(err);
                reject('Failed to Delete')
            });
        });
    }

    getScriptsForUser(userId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`/api/scripts/for-user/${userId}`).subscribe((resp) => {
                resolve(resp.json())
            }, (err) => {
                console.debug(err);
                reject('Failed to get scripts');
            });
        })
    }

    viewScript(scriptId: string) {
        // TODO fix for production.
        window.open(`http://localhost:3000/script-storage/script${scriptId}.pdf`);
    }
}
