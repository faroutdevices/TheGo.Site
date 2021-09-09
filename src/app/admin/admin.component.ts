import { Component, OnInit } from '@angular/core';
import { AzureSASCredential} from "@azure/data-tables";
import { DatePipe } from '@angular/common';
const  { TableClient } = require("@azure/data-tables");
const sas = "?sv=2020-08-04&ss=bfqt&srt=o&sp=rwdlacuptfx&se=2021-08-28T21:52:02Z&st=2021-08-18T13:52:02Z&spr=https,http&sig=gtEBLNYc5qlT05pbvjklVCflpXe4CsrIJ%2FJ6Xaq8NSY%3D";
let tableName = "SourceOfRequest";
const clientWithSAS = new TableClient('https://thegosite1.table.core.windows.net', tableName, new AzureSASCredential(sas));

import { QuestionAndAnswerDataService } from '../QuestionAndAnswerDataService';
//import { List, Dictionary } from 'ts-generic-collections-linq' //i'm adding this library to get linq-like capability, specificly for the Group-By, which is sort of missing from typescript, a little bit

import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [DatePipe, QuestionAndAnswerDataService]
})
export class AdminComponent implements OnInit {
  PageSection = 1;
  [x: string]: any;
  Title?: String;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https:/thego.site/1001';

  constructor(private datePipe:DatePipe, public questionAndAnswerDataService:QuestionAndAnswerDataService) { }

  ngOnInit(): void {
    //this.PageSection = 4;
    this.PageSection = 1;
    this.GroupAllQandA_Per_Survey_Respondent()
  }

  Login()
  {
    //Check against DB
    this.PageSection = 2;
  }

  ShowPageSection(PageSectionToShow: number)
  {
    this.PageSection = PageSectionToShow;
  }


  // //Individual user survey response
  ShowQuestionAnswersIndividual(theUserLookingFor: String)
  {
   this.questionAndAnswerDataService.ShowQuestionAnswersIndividual(theUserLookingFor);
  }

 // //All Type 2 Answers (Free form)
 ShowQuestionAnswers2()
 {
   this.questionAndAnswerDataService.ShowQuestionAnswers2();
 }

 // //All Type 1 Answers (Choice Answers)
 ShowQuestionAnswers3()
 {
     this.questionAndAnswerDataService.ShowQuestionAnswers3();
 }

 //Group all question and answers per user
 GroupAllQandA_Per_Survey_Respondent()
 {
     this.questionAndAnswerDataService.GroupAllQandA_Per_Survey_Respondent();
 }



}
