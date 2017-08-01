import {Injectable} from '@angular/core';
import {FeedbackRequest} from "../../interfaces/feedback-request";
import {Http} from "@angular/http";
import {Feedback} from "../../interfaces/feedback";

@Injectable()
export class FeedbackService {

    constructor(private http: Http) {
    }

    getSuggestedScripts(startFrom: number, include: number, options: any = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`/api/feedback-requests/suggested/start/${startFrom}/include/${include}/options/${JSON.stringify(options)}`).subscribe((data) => {
                resolve(data.json().suggestedFeedbackRequests);
            }, (err) => {
                console.debug(err);
            })
        });
    }

    getAllRequestsForScript(scriptId): Promise<Array<FeedbackRequest>> {
        return new Promise((resolve, reject) => {
            this.http.get(`/api/feedback-requests/by-script/${scriptId}`).subscribe((resp) => {
                let requests = resp.json().feedbackRequests;
                requests.forEach((request: FeedbackRequest) => {
                    request.untakenReviews = (request.maxReviews - (request.finishedReviews + request.outstandingReviews));
                    request.refundableCredits = (request.maxReviews - (request.finishedReviews + request.outstandingReviews)) * request.creditsOffered;
                });
                resolve(requests);
            }, (err) => {
                console.debug(err);
                reject(err);
            })
        });
    }

    getAllFeedbackForScript(scriptId): Promise<Array<Feedback>> {
        return new Promise((resolve, reject) => {
            this.http.get(`/api/feedback/by-script/${scriptId}`).subscribe((resp) => {
                resolve(resp.json().feedback);
            }, (err) => {
                console.debug(err);
                reject(err);
            });
        });
    }

    createNewFeedbackRequest(feedbackRequest: FeedbackRequest): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`/api/feedback-requests/add`, feedbackRequest).subscribe((resp) => {
                resolve(resp.json());
            }, (err) => {
               console.debug(err);
               reject(err);
            });
        })
    }

    cancelFeedbackRequest(feedbackRequest: FeedbackRequest): Promise<FeedbackRequest> {
        return new Promise((resolve, reject) => {
            this.http.put(`/api/feedback-requests/cancel`, feedbackRequest).subscribe((resp) => {
                resolve(resp.json().feedbackRequest);
            }, (err) => {
                console.debug(err);
                reject(err);
            })
        })
    }
}
