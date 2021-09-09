import { Component, OnInit, ComponentFactoryResolver, Input, TemplateRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { ApiReturnedObject2 } from '../api-returned-object2';
import { CookieService } from 'ngx-cookie-service';
import { AzureSASCredential, TableServiceClient } from "@azure/data-tables";
import { Console } from 'console';

const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");
const sas = "?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2021-10-11T01:55:29Z&st=2021-09-09T17:55:29Z&spr=https,http&sig=%2FXM2jpRHUT2JRLMA2eumMeidtcEgTMhWmvMWtbtgG1Q%3D";

let tableName = "QuestionAndAnswer";
const clientWithSAS = new TableClient('https://thegosite1.table.core.windows.net', tableName, new AzureSASCredential(sas));

export class SourceOfRequestRecords
{
  TheUser!: String;
  TheUserHuman!: String;
  LastVisit!: String;
  FirstVisit!: String;
}

export class QuestionAndAnswer
{
  TheUser!: String;
  Question: String = '';
  Answer!: String;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
[x: string]: any;
NewVersion: SourceOfRequestRecords[] = [];
FirstContactDates: SourceOfRequestRecords[] = [];
IndividualUser?: String;
TheQuestionsAndAnswers: QuestionAndAnswer[] = [];
Title?: String;

  title = '';
  question = '';
  isShow = true;
  private cookieValue: string = '';

  model: any = {};
  selection: any = {};
  AppComponent: any;

  constructor(public appComponent: AppComponent,
     private http: HttpClient, private cookieService: CookieService,
      private componentFactoryResolver: ComponentFactoryResolver) {

    //start with first question, or where user left off if browser was closed
    //or don't restart survey if already complete
      this.HasUserAlreadyAnsweredAllQuestions();
  }

  ngOnInit(): void {
  }

clickFunction(answer: string, answerType: number)
{
  this.SendQuestionAndAnswerResponseToDB(answer, answerType);

  this.appComponent.LastQuestionCompleted++;

  if (this.appComponent.bunchQuestions.length > this.appComponent.LastQuestionCompleted)
  {
    this.question = this.appComponent.bunchQuestions[this.appComponent.LastQuestionCompleted].questionText;
    this.questionType = this.appComponent.bunchQuestions[this.appComponent.LastQuestionCompleted].questionType;
  }
  else
  {
    this.question = "Done, thanks!"
    this.isShow = !this.isShow;
    this.showfooter = true;
  }
}

SendQuestionAndAnswerResponseToDB(answer: string, answerType: number)
{
  this.cookieValue = this.cookieService.get('BeenHereBefore');
  console.log(this.cookieValue);
  this.http.get<ApiReturnedObject2>(environment.urlFunctions1 + '/api/HttpTrigger_QuestionAndAnswer?Question=' + this.question + '&BeenHereBefore=' + this.cookieValue + '&Answer=' + answer + '&AnswerType=' + answerType).subscribe(returnstuff =>
    {
      //maybe do something
    }
  )
}

//look to see the last question completed, and don't allow user to take survey again
HasUserAlreadyAnsweredAllQuestions(){
  let theUserLookingFor = this.cookieService.get('BeenHereBefore');
  tableName = 'QuestionAndAnswer';
  let clientWithSAS = new TableClient('https://thegosite1.table.core.windows.net', tableName, new AzureSASCredential(sas));

console.log(clientWithSAS);

const main = async () => {

  let entitiesIter = clientWithSAS.listEntities();
  let i = 1;
  for await (const entity of entitiesIter) {
    let toAddThing: QuestionAndAnswer = new QuestionAndAnswer();
    toAddThing.TheUser = entity.Cookie_Previously_Set;
    toAddThing.Question = entity.Question;
    toAddThing.Answer = entity.Answer;
    this.TheQuestionsAndAnswers.push(toAddThing);
    i++;

    //console.log(i);
  }

  this.TheQuestionsAndAnswers = this.TheQuestionsAndAnswers.filter(x => x.TheUser == theUserLookingFor);

  console.log(theUserLookingFor + 'user');
  console.log(this.TheQuestionsAndAnswers.length + 'num of answers');

 if (this.TheQuestionsAndAnswers.length >= this.appComponent.bunchQuestions.length)
  {
    console.log(this.TheQuestionsAndAnswers.length + ' length 1');
    console.log(this.appComponent.bunchQuestions.length + ' length 2');

    this.question = "You've already completed the survey."
    this.isShow = !this.isShow;
  }
  else
  {
    //console.log(this.appComponent.LastQuestionCompleted);

    this.appComponent.LastQuestionCompleted = this.TheQuestionsAndAnswers.length;
    this.question = this.appComponent.bunchQuestions[this.appComponent.LastQuestionCompleted].questionText;
    this.questionType = this.appComponent.bunchQuestions[this.appComponent.LastQuestionCompleted].questionType;
  }

  console.log('here2');

}

let theAnswer = main();

this.showUsers1 = false;
this.showUsers2 = true;

}

RemoveCookie()
{
  this.cookieService.delete('BeenHereBefore');
}

}
