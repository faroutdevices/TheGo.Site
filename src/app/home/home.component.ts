import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Hi';
  private cookieValue: string = 'false';

  constructor(private route: ActivatedRoute, private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {

    //what is the source of the request, QR code, weblink, direct input
    let sourceofrequest = this.route.snapshot.paramMap.get('sourceofrequest')

    //look for cookie, has user been here before, if not set cookie here with client-side code
    let beenHereBefore: string = 'false';
    this.cookieValue = this.cookieService.get('BeenHereBefore');

    if (this.cookieValue == 'true')
    {
      beenHereBefore = 'true';
    }
    else
    {
      this.cookieService.set('BeenHereBefore', 'true'); //update this with expire date, etc perhaps
    }

    //note this is an insert, do doing PUT, need to test in Postman, browser won't work
    this.http.put(environment.urlFunctions1 + '?SourceOfRequest=' + sourceofrequest + '&BeenHereBefore=' + beenHereBefore, null).subscribe(returnstuff =>{})

  }

}
