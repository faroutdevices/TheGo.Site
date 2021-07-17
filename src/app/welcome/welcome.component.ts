import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/////import { ThermLoggingStatus } from '../../thermLoggngStatus';
import { HttpClient } from '@angular/common/http';
/////import { environment } from '../../environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

    /////let blah = this.route.snapshot.paramMap.get('sourceofrequest')
    /////this.http.put<ThermLoggingStatus>(environment.urlFunctions1 + '?SourceOfRequest=' + blah, null).subscribe(returnstuff =>{})

    /////let param1 = this.route.snapshot.paramMap.get('SourceOfRequest');
    //let param2 = this.route.snapshot.queryParamMap.get('blah')?.toString();
    //let param1 = this.http.request.toString();

  }

}
