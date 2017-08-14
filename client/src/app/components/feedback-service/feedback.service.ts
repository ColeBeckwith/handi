import {Injectable} from '@angular/core';
import {FeedbackRequest} from "../../interfaces/feedback-request";
import {Http} from "@angular/http";
import {Feedback} from "../../interfaces/feedback";
import {User} from "../../interfaces/user";

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

    getOptimalFeedbackRequestForScript(scriptId: string, reviewingUser: User): Promise<FeedbackRequest> {
        return new Promise((resolve, reject) => {
            let optimalFeedbackRequest = null;
            this.getAllRequestsForScript(scriptId).then((requests) => {
                requests.forEach((request) => {
                    if (request.untakenReviews > 0) {
                        if (request.minimumReviewerRating <= reviewingUser.reviewerRating) {
                            optimalFeedbackRequest = request;
                        }
                    }
                });
                resolve(optimalFeedbackRequest);
            }, (err) => {
                reject(err);
            })
        })
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

    acceptFeedbackRequest(feedbackRequest: FeedbackRequest): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`/api/feedback-requests/accept`, feedbackRequest).subscribe((resp) => {
                resolve();
            }, (err) => {
                console.debug(err);
                reject(err);
            })
        });
    }

    getFeedbackForUser(userId): Promise<Array<Feedback>> {
        return new Promise((resolve, reject) => {
            this.http.get(`/api/feedback/by-user/${userId}`).subscribe((data) => {
                let feedbacks = data.json().feedback;
                const currentDate = new Date().getTime();
                feedbacks.forEach((feedback) => {
                    if (!feedback.complete) {

                        let timeUntilDue = feedback.dueOn - currentDate;
                        if (timeUntilDue <= 0) {
                            feedback.timeUntilDue = 'Past Due';
                        } else if (timeUntilDue <= 86400000) {
                            feedback.timeUntilDue = (Math.floor(timeUntilDue / 3600000)) + ' Hours';
                        } else {
                            feedback.timeUntilDue = (Math.floor(timeUntilDue / 86400000)) + ' Days';
                        }

                    }
                });
                resolve(feedbacks);
            }, (err) => {
                console.debug(err);
                reject(err);
            });
        });
    }

    getSingleFeedback(feedbackId): Promise<Feedback> {
        return new Promise((resolve, reject) => {
            this.http.get(`/api/feedback/${feedbackId}`).subscribe((data) => {
                resolve(data.json().feedback);
            }, (err) => {
                console.debug(err);
                reject(err);
            })
        });
    }

    saveFeedbackDraft(feedback: Feedback): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(`/api/feedback/${feedback._id}`, feedback).subscribe((data) => {
                resolve(data);
            }, (err) => {
                console.debug(err);
                reject(err);
            })
        });
    }

    submitFinalFeedback(feedback: Feedback): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`/api/feedback/submit`, feedback).subscribe((data) => {
                resolve(data.json());
            }, (err) => {
                console.debug(err);
                reject(err);
            });
        });
    }


}
