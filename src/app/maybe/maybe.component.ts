import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maybe',
  templateUrl: './maybe.component.html',
  styleUrls: ['./maybe.component.css']
})
export class MaybeComponent implements OnInit {
  title = '';
  model: any = {}; //this is for email, and whatever other info I may try to collect

  constructor() { }

  ngOnInit(): void {
  }

  SubmitEmail() {
    console.log(this.model.email);
  }

}
