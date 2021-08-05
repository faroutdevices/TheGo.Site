import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ApiReturnedObject1 } from './api-returned-object1';
import { environment } from 'src/environments/environment';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private sourceofrequest: string = '';
  private cookieValue: string = '';
  private pathRequested: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private cookieService: CookieService)
  {
    this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
          console.log("in subscribing to fire on every router event" + e);
          this.SendPageRequestDetails_GenerateClientID();
          }
      }
    )
  }

  SendPageRequestDetails_GenerateClientID()
  {
    // //what is the source of the request, QR code, weblink, direct input
    this.sourceofrequest = <string>this.route.snapshot.paramMap.get('sourceofrequest')
    this.pathRequested = window.location.pathname;
    this.cookieValue = this.cookieService.get('BeenHereBefore');

      this.http.get<ApiReturnedObject1>(environment.urlFunctions1 + '?SourceOfRequest=' + this.sourceofrequest + '&BeenHereBefore=' + this.cookieValue + '&PathRequested=' + this.pathRequested).subscribe(returnstuff =>
      {
        if (returnstuff.TheGoSiteClientID != null)
        {
          this.cookieValue = returnstuff.TheGoSiteClientID;
        }
        this.cookieService.set('BeenHereBefore', this.cookieValue); //update this with expire date, etc perhaps
      }
    )
  }

  ngOnInit(): void {
  }


}


