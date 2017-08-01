import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {LoginService} from "./components/login-service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private loginService: LoginService) {
    }

    ngOnInit() {
        this.loginService.authorizeUser();
        this.loginService.getUserInfoFromServer();
    }
}
