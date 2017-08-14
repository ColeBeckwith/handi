import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FeedbackService} from "../feedback-service/feedback.service";
import {Feedback} from "../../interfaces/feedback";

@Component({
    selector: 'gid-feedback-submission',
    templateUrl: './feedback-submission.component.html',
    styleUrls: ['./feedback-submission.component.scss']
})
export class FeedbackSubmissionComponent implements OnInit {
    feedback: Feedback;

    constructor(private route: ActivatedRoute,
                private feedbackService: FeedbackService,
                private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.feedbackService.getSingleFeedback(params['feedbackId']).then((resp) => {
                this.feedback = resp;
            }, (err) => {
                this.router.navigate([`home`]);
            });
        });
    }

    saveDraft() {
        this.feedbackService.saveFeedbackDraft(this.feedback).then((resp) => {

        }, (err) => {
            // Do something
        });
    }

    submitFinal() {
        this.feedbackService.submitFinalFeedback(this.feedback).then((resp) => {

        }, (err) => {
            // Do something
        });
    }

}
