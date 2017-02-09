import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  API = 'http://localhost:3000';
  people: any[] = [];

  constructor(private http: Http) {
  }


  ngOnInit() {
    this.getAllPeople();
  }

  addPerson(name, age) {
    this.http.post(`${this.API}/users`, {name, age})
      .subscribe(() => {
        this.getAllPeople();
      })
  }

  // Get all users from the API
  getAllPeople() {
    this.http.get(`${this.API}/users`)
      .subscribe((people) => {
        console.log(people);
        this.people = people.json();
      })
  }
}
