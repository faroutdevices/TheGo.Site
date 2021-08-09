import { Component, OnInit, ComponentFactoryResolver, Input, TemplateRef } from '@angular/core';
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

  constructor(public appComponent: AppComponent, private http: HttpClient, private cookieService: CookieService, private componentFactoryResolver: ComponentFactoryResolver) {
    console.log("in constructor of home component");
    //start with first question, or where user left off
      this.question = this.appComponent.bunchQuestions[this.appComponent.LastQuestionCompleted].questionText;

      this.appComponent.bunchQuestions[this.appComponent.LastQuestionCompleted].answer.forEach(element =>
          {console.log(element)}
        );
  }

  ngOnInit(): void {
  }

  clickFunction(answer: string)
  {
    this.SendQuestionAndAnswerResponseToDB(answer);

    this.appComponent.LastQuestionCompleted++;

    if (this.appComponent.bunchQuestions.length > this.appComponent.LastQuestionCompleted)
    {
      this.question = this.appComponent.bunchQuestions[this.appComponent.LastQuestionCompleted].questionText;
      //There's only one question which we assign here, but multiple answers which we create buttons for in the html template
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
