import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('hiiiiiiiIII');

    let param1 = this.route.snapshot.paramMap.get('SourceOfRequest');
    //let param2 = this.route.snapshot.queryParamMap.get('blah')?.toString();
    //let param1 = this.http.request.toString();
    console.log('  hi' + param1);


  }

}
