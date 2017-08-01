import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ScriptsService} from "../scripts-service/scripts.service";
import {Script} from '../../interfaces/script';
import {FeedbackService} from "../feedback-service/feedback.service";
import {FeedbackRequest} from "../../interfaces/feedback-request";
import {Feedback} from "../../interfaces/feedback";

@Component({
    selector: 'gid-script-details',
    templateUrl: './script-details.component.html',
    styleUrls: ['./script-details.component.scss']
})
export class ScriptDetailsComponent implements OnInit {
    script: Script;
    feedbackRequests: Array<FeedbackRequest>;
    feedback: Array<Feedback>;

    constructor(private route: ActivatedRoute,
                private scriptsService: ScriptsService,
                private feedbackService: FeedbackService,
                private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: any) => {
            if (params.scriptId) {

                // Get The Script
                this.scriptsService.getScript(params.scriptId).then((resp) => {
                    this.script = resp;
                }, (error) => {
                    console.debug(error);
                });

                // Get The Requests
                this.feedbackService.getAllRequestsForScript(params.scriptId).then((resp) => {
                    this.feedbackRequests = resp;
                }, (err) => {
                    console.debug(err);
                });

                // Get The Feedback
                this.feedbackService.getAllFeedbackForScript(params.scriptId).then((resp) => {
                    this.feedback = resp;
                }, (err) => {
                    console.debug(err)
                });
            } else {
                console.debug('Invalid Script id in Params.')
            }

        });
    }

    viewScript() {
        // TODO fix for production.
        window.open(`http://localhost:3000/script-storage/script${this.script._id}.pdf`);
    }

    createFeedbackRequest() {
        this.router.navigate([`/new-feedback-request/${this.script._id}`]);
    }

    triggerNewVersionUpload() {
        document.getElementById('scriptUploadInput').click();
    }

    uploadNewVersion(event) {
        this.scriptsService.uploadScript(this.script, event.target.files[0]).then((resp) => {
            // TODO add toastr here.
        }, (err) => {
            console.debug(err);
        });
    }

    deleteScript() {
        if (confirm(`Are you sure you want to delete ${this.script.name}? It will not be possible to recover.`)) {
            this.scriptsService.deleteScript(this.script).then((resp) => {
                // TODO add toastr here.
                this.router.navigate(['home']);
            }, (err) => {
                // Do nothing.
            })
        }
    }

    cancelFeedbackRequest(feedbackRequest: FeedbackRequest) {
        this.feedbackService.cancelFeedbackRequest(feedbackRequest).then((resp) => {
            this.feedbackService.getAllRequestsForScript(this.script._id).then((resp) => {
                this.feedbackRequests = resp;
            });
        }, (err) => {
            // Do nothing.
        });
    }


}
