import { Component, OnInit } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-yes',
  templateUrl: './yes.component.html',
  styleUrls: ['./yes.component.css']
})
export class YesComponent implements OnInit {
  model: any = {}; //this is for email, and whatever other info I may try to collect

  constructor() { }

  ngOnInit(): void {
  }

  SubmitEmail() {

    console.log(this.model.email);
    //this.MakeTheChart(this.model.startDate, this.model.endDate);
}

}
