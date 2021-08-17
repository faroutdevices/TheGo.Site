import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { AzureSASCredential, TableServiceClient } from "@azure/data-tables";
import { timeStamp } from 'console';

export class ReturnedStuff
{
  TheUser!: String;
  LastVisit!: String;
  FirstVisit!: String;
}
@Component({
  selector: 'app-client-activity',
  templateUrl: './client-activity.component.html',
  styleUrls: ['./client-activity.component.css']
})
export class ClientActivityComponent {

  [x: string]: any;
  title = 'Movement';
  myReturnedStuff: ReturnedStuff[] = [];
  myTest2: ReturnedStuff[] = [];
  UserFirstContactDate: ReturnedStuff[] = [];
  UserLastContactDate: ReturnedStuff[] = [];
  MergedDistictUserWithFirstAndLastVisit: ReturnedStuff[] = [];

  constructor(){
    const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");
    const sas = "?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2021-08-18T11:25:07Z&st=2021-08-11T03:25:07Z&spr=https&sig=B%2F9QpjWiFEhjO7PFBc9k5WZ61LgUoVeebJr%2Foh7HQ%2B0%3D";
    const tableName = "SourceOfRequest";
    const clientWithSAS = new TableClient('https://thegosite1.table.core.windows.net', tableName, new AzureSASCredential(sas));

    const main = async () => {
      let entitiesIter = clientWithSAS.listEntities();
      let i = 1;
       for await (const entity of entitiesIter) {
        let toAddThing: ReturnedStuff = new ReturnedStuff();
        toAddThing.LastVisit = entity.timestamp;
        toAddThing.FirstVisit = entity.timestamp;
        toAddThing.TheUser = entity.Cookie_Previously_Set;
        this.myTest2.push(toAddThing);
         i++;

        //Sort by timestamp ASC, then get distict
        this.UserFirstContactDate = this.myTest2.sort((x,y) => x.LastVisit > y.LastVisit ? 1 : -1);
        this.UserFirstContactDate = this.UserFirstContactDate.filter((thing, i, arr) => arr.findIndex(t => t.TheUser === thing.TheUser) === i);

        //Sort by timestamp DSC, then get distict
        this.UserLastContactDate = this.myTest2.sort((x,y) => y.LastVisit > x.LastVisit ? 1 : -1);
        this.UserLastContactDate = this.UserLastContactDate.filter((thing, i, arr) => arr.findIndex(t => t.TheUser === thing.TheUser) === i);

        this.MergedDistictUserWithFirstAndLastVisit = Object.assign(this.UserFirstContactDate, this.UserLastContactDate);
      }

    }
      main();
    }

  ngOnInit(): void {
  }

}
