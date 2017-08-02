import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login-service/login.service";
import {User} from "../../interfaces/user";
import {Router} from "@angular/router";

@Component({
    selector: 'gid-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    constructor(public loginService: LoginService, private router: Router) {
    }

    ngOnInit() {
    }

    logOut() {
        this.loginService.logOut();
    }

    goToProfile() {
        this.router.navigate(['user']);
    }

    goHome() {
        this.router.navigate(['home']);
    }

}
