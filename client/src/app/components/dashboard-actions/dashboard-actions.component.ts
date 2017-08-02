import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'gid-dashboard-actions',
  templateUrl: './dashboard-actions.component.html',
  styleUrls: ['./dashboard-actions.component.scss']
})
export class DashboardActionsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submitScript() {
      this.router.navigate(['script-submission']);
  }

  goToMyTasks() {
      this.router.navigate(['user/current/section/tasks']);
  }

  goToMyTables() {

  }

}
