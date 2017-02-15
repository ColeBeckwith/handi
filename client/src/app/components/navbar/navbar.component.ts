import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login-service/login.service";
import {IUser} from "../../interfaces/iuser";

@Component({
    selector: 'gid-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    constructor(public loginService: LoginService) {
    }

    ngOnInit() {
    }

    logOut() {
        this.loginService.logOut();
    }

    goToProfile() {

    }

}
