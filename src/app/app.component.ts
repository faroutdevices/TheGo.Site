import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ThermLoggingStatus } from '../thermLoggngStatus';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

//import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'thegosite1';
  deviceInfo = null;

  //constructor(private route: ActivatedRoute, private http: HttpClient, private deviceService: DeviceDetectorService)
  constructor(private route: ActivatedRoute, private http: HttpClient)
  {
    //this.epicFunction();
  }

  ngOnInit() {

    let param1 = this.route.snapshot.paramMap.get('SourceOfRequest');
    console.log('Source of request: '+ param1);


    this.http.get<ThermLoggingStatus>(environment.urlFunctions1 + '?SourceOfRequest=' + param1).subscribe(returnstuff =>{})

  }

  // epicFunction() {
  //   console.log('hello `Home` component');
  //   //this.deviceInfo = this.deviceService.getDeviceInfo();
  //   const isMobile = this.deviceService.isMobile();
  //   const isTablet = this.deviceService.isTablet();
  //   const isDesktopDevice = this.deviceService.isDesktop();
  //   console.log(this.deviceInfo);
  //   console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
  //   console.log(isTablet);  // returns if the device us a tablet (iPad etc)
  //   console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
  // }

}


