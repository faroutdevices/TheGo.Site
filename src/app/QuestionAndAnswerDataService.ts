import { DatePipe, Time } from "@angular/common";
import { Injectable } from "@angular/core";
import { QuestionAndAnswer } from "./QuestionAndAnswer";
import { SourceOfRequestRecord } from "./SourceOfRequestRecord";
import { AzureSASCredential} from "@azure/data-tables";
import { timeStamp } from "console";
const  { TableClient } = require("@azure/data-tables");
let tableName = "SourceOfRequest";
const clientWithSAS = new TableClient(environment.azureTablePath, tableName, new AzureSASCredential(environment.sas));
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class QuestionAndAnswerDataService {
  [x: string]: any;
  NewVersion: SourceOfRequestRecord[] = [];
  FirstContactDates: SourceOfRequestRecord[] = [];
  LastContactDates: SourceOfRequestRecord[] = [];
  MergedDistictUserWithFirstAndLastVisit: SourceOfRequestRecord[] = [];
  IndividualUser?: String;
  TheQuestionsAndAnswers: QuestionAndAnswer[] = [];
  TheQuestionsAndAnswersOneUser: QuestionAndAnswer[] = [];
  OnlyFreeFormTextAnswers: QuestionAndAnswer[] = [];
  Title?: String;
  TheQuestionsAndAnswersDistictUser: QuestionAndAnswer[] = [];
  SurveyofOneUser: QuestionAndAnswer[] = [];
  SingleUserSurvey: QuestionAndAnswer[] = [];

  constructor(private datePipe:DatePipe){
  }

  ngOnInit(): void {
  }

  ShowAllUsers()
  {
    this.isLoggedIn = true;
    this.Title = 'All Guests';

    const main = async () => {
            let entitiesIter = clientWithSAS.listEntities();
            let i = 1;
            for await (const entity of entitiesIter) {
              let toAddThing: SourceOfRequestRecord = new SourceOfRequestRecord();
              toAddThing.TheUser = entity.Cookie_Previously_Set;
              toAddThing.FirstVisit = entity.timestamp;
              toAddThing.LastVisit = entity.timestamp;
              this.NewVersion.push(toAddThing);
              i++;
            }

            console.log(this.NewVersion.length);

          //Sort by timestamp ASC, then get distict
          this.FirstContactDates = this.NewVersion.sort((x,y) => x.LastVisit > y.LastVisit ? 1 : -1);
          this.FirstContactDates = this.FirstContactDates.filter((thing, i, arr) => arr.findIndex(t => t.TheUser === thing.TheUser) === i);

          //Sort by timestamp DESC
          this.LastContactDates = this.NewVersion.sort((x,y) => y.LastVisit > x.LastVisit ? 1 : -1);

          //Add the last time visited to the array, and add a human readable cust ID for display
          let iThisUser: number = 0;
          this.FirstContactDates.forEach(element => {
            this.LastVisitofThisUser = this.LastContactDates.filter(x => x.TheUser == element.TheUser)[0].LastVisit;
            this.LastVisitofThisUser = this.datePipe.transform(this.LastVisitofThisUser,'yyyy-MM-dd  h:mm:ss')?.toString();
            this.FirstContactDates[iThisUser].LastVisit = this.LastVisitofThisUser;

            this.FormattedDateTime = this.FirstContactDates[iThisUser].FirstVisit;
            this.FormattedDateTime = this.datePipe.transform(this.FormattedDateTime,'yyyy-MM-dd  h:mm:ss')?.toString();

            this.FirstContactDates[iThisUser].FirstVisit = this.FormattedDateTime;
            this.FirstContactDates[iThisUser].TheUserHuman = (iThisUser + 1).toString();

            iThisUser++;
          });

            //Sort by timestamp ASC, then get distict
            this.FirstContactDates = this.NewVersion.sort((x,y) => x.LastVisit > y.LastVisit ? 1 : -1);
            this.FirstContactDates = this.FirstContactDates.filter((thing, i, arr) => arr.findIndex(t => t.TheUser === thing.TheUser) === i);
            }

    main();

  }

  //Individual user survey response
  ShowQuestionAnswersIndividual(theUserLookingFor: String) {
    console.log('individuaala');
    this.IndividualUser = theUserLookingFor;
    this.Title = 'Guest: ' + theUserLookingFor;
    tableName = 'QuestionAndAnswer';
    let clientWithSAS2 = new TableClient('https://thegosite1.table.core.windows.net', tableName, new AzureSASCredential(environment.sas));

  const main = async () => {

    let entitiesIter = clientWithSAS2.listEntities();
    let i = 1;
    for await (const entity of entitiesIter) {
      let toAddThing: QuestionAndAnswer = new QuestionAndAnswer();
      toAddThing.TheUser = entity.Cookie_Previously_Set;
      toAddThing.Question = entity.Question;
      toAddThing.Answer = entity.Answer;
      toAddThing.AnswerType = entity.Answer_Type
      toAddThing.Timestamp = entity.Timestamp;
      this.TheQuestionsAndAnswers.push(toAddThing);
      i++;
    }

    this.TheQuestionsAndAnswersOneUser = this.TheQuestionsAndAnswers.sort((x,y) => x.Timestamp > y.Timestamp ? 1 : -1);
    this.TheQuestionsAndAnswersOneUser = this.TheQuestionsAndAnswersOneUser.filter(x => x.TheUser == theUserLookingFor);
  }

  main();

  }

  //All Type 2 Answers (Free form)
  ShowQuestionAnswers2() {
  this.Title = 'Type 2 Answers';
  tableName = 'QuestionAndAnswer';
  let clientWithSAS2 = new TableClient('https://thegosite1.table.core.windows.net', tableName, new AzureSASCredential(environment.sas));

  const main = async () => {

  let entitiesIter = clientWithSAS2.listEntities();
  let i = 1;
  for await (const entity of entitiesIter) {
    let toAddThing: QuestionAndAnswer = new QuestionAndAnswer();
    toAddThing.TheUser = entity.Cookie_Previously_Set;
    toAddThing.Question = entity.Question;
    toAddThing.Answer = entity.Answer;
    toAddThing.AnswerType = entity.Answer_Type
    this.TheQuestionsAndAnswers.push(toAddThing);
    i++;
  }
  this.OnlyFreeFormTextAnswers = this.TheQuestionsAndAnswers.filter(x => x.AnswerType == 2);
  }

  main();

  this.showUsers1 = false;
  this.showUsers2 = false;
  this.showUsers3 = true;
  this.showUsers4 = false;
  }

  //All Type 1 Answers (Choice Answers)
  ShowQuestionAnswers3() {
  this.Title = 'Type 1 Answers';
  tableName = 'QuestionAndAnswer';
  let clientWithSAS2 = new TableClient('https://thegosite1.table.core.windows.net', tableName, new AzureSASCredential(environment.sas));

  const main = async () => {

  let entitiesIter = clientWithSAS2.listEntities();
  let i = 1;
  let lastUser: string = '';
  for await (const entity of entitiesIter) {
    let toAddThing: QuestionAndAnswer = new QuestionAndAnswer();
    toAddThing.TheUser = entity.Cookie_Previously_Set;
    toAddThing.Question = entity.Question;
    toAddThing.Answer = entity.Answer;
    toAddThing.AnswerType = entity.Answer_Type
    this.TheQuestionsAndAnswers.push(toAddThing);
    i++;
  }

  this.OnlyFreeFormTextAnswers = this.TheQuestionsAndAnswers; //.filter(x => x.AnswerType == 1);

  }

  main();

  this.showUsers1 = false;
  this.showUsers2 = false;
  this.showUsers3 = false;
  this.showUsers4 = true;
  }

  //Group By
  GroupAllQandA_Per_Survey_Respondent() {
    //this.Title = 'Type 1 Answers';
    tableName = 'QuestionAndAnswer';
    let clientWithSAS2 = new TableClient(environment.azureTablePath, tableName, new AzureSASCredential(environment.sas));

    const main = async () => {
      let entitiesIter = clientWithSAS2.listEntities();
      let i = 1;
      let lastUser: string = '';
      for await (const entity of entitiesIter) {
        let toAddThing: QuestionAndAnswer = new QuestionAndAnswer();
        toAddThing.TheUser = entity.Cookie_Previously_Set;
        toAddThing.Question = entity.Question;
        toAddThing.Answer = entity.Answer;
        toAddThing.Timestamp = entity.timestamp
        this.TheQuestionsAndAnswers.push(toAddThing);
        i++;
    }
      //Sort questions and anwers by timestamp
      this.TheQuestionsAndAnswers = this.TheQuestionsAndAnswers.sort((x,y) => x.Timestamp > y.Timestamp ? 1 : -1);

      //Sort by timestamp ASC, then get distict
      this.TheQuestionsAndAnswersDistictUser = this.TheQuestionsAndAnswers.sort((x,y) => x.Timestamp > y.Timestamp ? 1 : -1);
      this.TheQuestionsAndAnswersDistictUser = this.TheQuestionsAndAnswersDistictUser.filter((thing, i, arr) => arr.findIndex(t => t.TheUser === thing.TheUser) === i);

      //now from the distict list, get the questions and answers
      let iThisUser: number = 0;
      this.TheQuestionsAndAnswersDistictUser.forEach(element => {

      this.SurveyofOneUser = this.TheQuestionsAndAnswers.filter(i => i.TheUser === element.TheUser);
      this.SurveyofOneUser = this.SurveyofOneUser.sort((x,y) => x.Timestamp > y.Timestamp ? 1 : -1);

      this.SurveyofOneUser.forEach(element2 => {
      this.SingleUserSurvey.push(element2);
      console.log(element2.Answer + '   ' + element2.Timestamp);
      })

      let Spacer: QuestionAndAnswer = new QuestionAndAnswer;
      Spacer.Answer = '--SPACER--';

      this.SingleUserSurvey.push(Spacer);
      iThisUser++;
    })
  }

    main();

    this.showUsers1 = false;
    this.showUsers2 = false;
    this.showUsers3 = false;
    this.showUsers4 = true;
    }

}
