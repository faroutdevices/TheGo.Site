import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ApiReturnedObject1 } from './api-returned-object1';
import { environment } from 'src/environments/environment';
import { Router,NavigationEnd } from '@angular/router';

class Question{
  public question: string = "";
  public answers: string[] = [];

  addQuestion(newQuestion: string, newAnswer1: string, newAnswer2: string, newAnswer3: string)
  {
    this.question = newQuestion;
    this.answers.push(newAnswer1);
    this.answers.push(newAnswer2);
    this.answers.push(newAnswer3);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private sourceofrequest: string = '';
  private cookieValue: string = '';
  private pathRequested: string = '';
  public questionsaaa: Question[] = [];
  public LastQuestionCompleted: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private cookieService: CookieService)
  {
    this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
          console.log("in subscribing to fire on every router event" + e);
          this.SendPageRequestDetails_GenerateClientID();
          }
      }
    )

    this.questionsaaa[0] = new Question();
    this.questionsaaa[0].addQuestion("Q1","1A1","1a2","1a3");

    this.questionsaaa[1] = new Question();
    this.questionsaaa[1].addQuestion("Q2","2A1","2a2","2a3");

    this.questionsaaa[2] = new Question();
    this.questionsaaa[2].addQuestion("Q3","3A1","3a2","3a3");

    this.questionsaaa[3] = new Question();
    this.questionsaaa[3].addQuestion("Q4","4A1","4a2","a3");

  }

  SendPageRequestDetails_GenerateClientID()
  {
    // //what is the source of the request, QR code, weblink, direct input
    this.sourceofrequest = <string>this.route.snapshot.paramMap.get('sourceofrequest')
    this.pathRequested = window.location.pathname;
    this.cookieValue = this.cookieService.get('BeenHereBefore');

      this.http.get<ApiReturnedObject1>(environment.urlFunctions1 + '/api/HttpTrigger_SourceOfRequest?SourceOfRequest=' + this.sourceofrequest + '&BeenHereBefore=' + this.cookieValue + '&PathRequested=' + this.pathRequested).subscribe(returnstuff =>
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


