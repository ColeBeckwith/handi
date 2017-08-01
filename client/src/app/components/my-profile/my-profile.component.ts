import {Component, OnInit} from '@angular/core';
import {ScriptsService} from "../scripts-service/scripts.service";
import {Script} from '../../interfaces/script';
import {Router} from "@angular/router";

@Component({
    selector: 'gid-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
    myScripts: Array<Script> = [];

    constructor(private scriptsService: ScriptsService,
                private router: Router) {
    }

    ngOnInit() {
        this.scriptsService.getMyScripts().then((resp) => {
            this.myScripts = resp;
            console.log(this.myScripts);
        }, (err) => {
            console.debug(err);
            // Do Nothing.
        });
    }

    confirmDeleteScript(script: Script, index: number) {
        if (confirm(`Are you sure you want to delete ${script.name}? It will not be possible to recover.`)) {
            this.scriptsService.deleteScript(script).then((resp) => {
                // TODO add toastr here.
                this.myScripts.splice(index, 1);
            }, (err) => {
                // Do nothing.
            })
        }
    }

    selectScript(script: Script) {
        this.router.navigate([`script-details`, script._id])
    }

}
