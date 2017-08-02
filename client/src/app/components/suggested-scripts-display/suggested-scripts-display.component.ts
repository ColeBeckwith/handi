import {Component, OnInit} from '@angular/core';
import {FeedbackService} from "../feedback-service/feedback.service";
import {FeedbackRequest} from "../../interfaces/feedback-request";
import {Router} from "@angular/router";

@Component({
    selector: 'gid-suggested-scripts-display',
    templateUrl: './suggested-scripts-display.component.html',
    styleUrls: ['./suggested-scripts-display.component.scss']
})
export class SuggestedScriptsDisplayComponent implements OnInit {
    paginationEnd: number = 0;
    suggestedFeedbackRequests: Array<FeedbackRequest> = [];

    constructor(private feedbackService: FeedbackService,
                private router: Router) {
    }

    ngOnInit() {
        this.feedbackService.getSuggestedScripts(this.paginationEnd, 10).then((resp) => {
            this.suggestedFeedbackRequests = resp;
        });
    }

    viewScriptDetails(scriptId) {
        this.router.navigate([`script-details/${scriptId}`]);
    }

    viewAuthorPage(userId) {
        this.router.navigate([`user`, userId])
    }

    acceptFeedbackRequest(feedbackRequest: FeedbackRequest) {
        this.feedbackService.acceptFeedbackRequest(feedbackRequest).then((resp) => {
            this.router.navigate([`user/current/section/tasks`]);
        }, (err) => {

        });
    }



}
