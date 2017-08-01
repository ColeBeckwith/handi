import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Script} from "../../interfaces/script";
import {ScriptsService} from "../scripts-service/scripts.service";

@Component({
    selector: 'gid-script-submission',
    templateUrl: './script-submission.component.html',
    styleUrls: ['./script-submission.component.scss']
})
export class ScriptSubmissionComponent implements OnInit {
    script: Script;
    errors: Array<string>;
    scriptFile: File;

    constructor(private router: Router, private scriptsService: ScriptsService) {
    }

    ngOnInit() {
        this.script = new Script();
    }

    cancelSubmission() {
        this.router.navigate(['home']);
    }

    submitScript() {
        this.errors = [];
        if (!this.script.name) {
            this.errors.push('Script Is Missing Name');
        }
        if (!this.scriptFile) {
            this.errors.push('No Script Uploaded.');
        }

        if (this.errors.length === 0) {
            this.scriptsService.addScript(this.script, this.scriptFile).then((resp) => {
                this.router.navigate(['home']);
            }, (err) => {
                // TODO add toastr error here.
                console.debug(err);
            });
        }
    }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            this.scriptFile = fileList[0];
        }
    }
}
