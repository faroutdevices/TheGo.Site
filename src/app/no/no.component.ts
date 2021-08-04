import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no',
  templateUrl: './no.component.html',
  styleUrls: ['./no.component.css']
})
export class NoComponent implements OnInit {
  title = '';
  model: any = {}; //this is for email, and whatever other info I may try to collect

  constructor() { }

  ngOnInit(): void {
  }

  SubmitEmail() {
    console.log(this.model.email);
  }

}
