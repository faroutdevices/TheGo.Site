import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { ApiReturnedObject2 } from '../api-returned-object2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = '';
  question = '';
  answer1 = '';
  answer2 = '';
  answer3 = '';
  isShow = true;
  private cookieValue: string = '';

  model: any = {};
  selection: any = {};
  AppComponent: any;

  constructor(public appComponent: AppComponent, private http: HttpClient, private cookieService: CookieService) {

    //start with first question, or where user left off
      this.question = this.appComponent.questionsaaa[this.appComponent.LastQuestionCompleted].question
      this.answer1 = this.appComponent.questionsaaa[this.appComponent.LastQuestionCompleted].answers[0];
      this.answer2 = this.appComponent.questionsaaa[this.appComponent.LastQuestionCompleted].answers[1];
      this.answer3 = this.appComponent.questionsaaa[this.appComponent.LastQuestionCompleted].answers[2];
  }

  ngOnInit(): void {
  }

  clickFunction(answer: string)
  {
    console.log(this.appComponent.questionsaaa[0].question);
    console.log(answer);

    this.SendQuestionAndAnswerResponseToDB(answer);

    this.appComponent.LastQuestionCompleted++;

    if (this.appComponent.questionsaaa.length > this.appComponent.LastQuestionCompleted)
    {
      this.question = this.appComponent.questionsaaa[this.appComponent.LastQuestionCompleted].question
      this.answer1 = this.appComponent.questionsaaa[this.appComponent.LastQuestionCompleted].answers[0];
      this.answer2 = this.appComponent.questionsaaa[this.appComponent.LastQuestionCompleted].answers[1];
      this.answer3 = this.appComponent.questionsaaa[this.appComponent.LastQuestionCompleted].answers[2];
    }
    else
    {
      this.question = "Done, thanks!"
      this.isShow = !this.isShow;
    }

    console.log(this.model.email);
    this.model.email = 'set it in code';
  }

  SendQuestionAndAnswerResponseToDB(answer: string)
  {
    this.cookieValue = this.cookieService.get('BeenHereBefore');

    this.http.get<ApiReturnedObject2>(environment.urlFunctions1 + '/api/HttpTrigger_QuestionAndAnswer?Question=' + this.question + '&BeenHereBefore=' + this.cookieValue + '&Answer=' + answer).subscribe(returnstuff =>
      {

      }
    )
  }

}
