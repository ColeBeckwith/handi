import {Component, OnInit} from '@angular/core';
import {FeedbackService} from "../feedback-service/feedback.service";

@Component({
    selector: 'gid-suggested-scripts-display',
    templateUrl: './suggested-scripts-display.component.html',
    styleUrls: ['./suggested-scripts-display.component.scss']
})
export class SuggestedScriptsDisplayComponent implements OnInit {
    paginationEnd: number = 0;

    constructor(private feedbackService: FeedbackService) {
    }

    ngOnInit() {
        this.feedbackService.getSuggestedScripts(this.paginationEnd, 10).then((resp) => {
            console.log(resp);
        });
    }



}
