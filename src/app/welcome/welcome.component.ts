import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

//testing pull request in github

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

    let testPassValue = this.route.snapshot.paramMap.get('sourceofrequest');
    console.log(testPassValue);
    //this.http.put<ThermLoggingStatus>(environment.urlFunctions1 + '?SourceOfRequest=' + testPassValue, null).subscribe(returnstuff =>{})
    //let param1 = this.route.snapshot.paramMap.get('SourceOfRequest');
    //let param2 = this.route.snapshot.queryParamMap.get('test')?.toString();
    //let param1 = this.http.request.toString();
  }

}
