import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ThermLoggingStatus } from '../thermLoggngStatus';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'thegosite1';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {

    let param1 = this.route.snapshot.paramMap.get('SourceOfRequest');
    console.log('Source of request: '+ param1 + 'mmmmm');

    this.http.put<ThermLoggingStatus>(environment.urlFunctions1 + 'http://localhost:7071/api/HttpTrigger_SourceOfRequest?SourceOfRequest=' + param1, null).subscribe(returnstuff =>{})

  }


}
