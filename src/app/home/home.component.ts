import { Component, OnInit, ComponentFactoryResolver, Input, TemplateRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { ApiReturnedObject2 } from '../api-returned-object2';
import { CookieService } from 'ngx-cookie-service';
//import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // form: FormGroup = this.fb.group({
  //   firstName: [null],
  //   interests: [null]
  // });

  title = '';
  question = '';
  questionType;
  answer1 = '';
  answer2 = '';
  answer3 = '';
  isShow = true;
  private cookieValue: string = '';

  model: any = {};
  selection: any = {};
  AppComponent: any;

  constructor(public appComponent: AppComponent,
     private http: HttpClient, private cookieService: CookieService,
      private componentFactoryResolver: ComponentFactoryResolver) {

    //start with first question, or where user left off
      this.question = this.appComponent.bunchQuestions[this.appComponent.LastQuestionCompleted].questionText;
      this.questionType = this.appComponent.bunchQuestions[this.appComponent.LastQuestionCompleted].questionType;

      this.appComponent.bunchQuestions[this.appComponent.LastQuestionCompleted].answer.forEach(element =>
          {console.log(element)}
        );
  }

  ngOnInit(): void {
  }

  clickFunction(answer: string)
  {
    // let theAnswer: string;
    // if (answer)
    // {
    //   theAnswer = answer;
    // }
    // else
    // {
    //   theAnswer = answerText;

    // }

     console.log(answer);

    this.SendQuestionAndAnswerResponseToDB(answer);

    this.appComponent.LastQuestionCompleted++;

    if (this.appComponent.bunchQuestions.length > this.appComponent.LastQuestionCompleted)
    {
      this.question = this.appComponent.bunchQuestions[this.appComponent.LastQuestionCompleted].questionText;
      //There's only one question which we assign here, but multiple answers which we create buttons for in the html template
      this.questionType = this.appComponent.bunchQuestions[this.appComponent.LastQuestionCompleted].questionType;
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
