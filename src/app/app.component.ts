import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { environment } from '../environments/environment';
//import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //constructor(private route: ActivatedRoute, private http: HttpClient, private deviceService: DeviceDetectorService)
  constructor(private route: ActivatedRoute)
  {
    //this.epicFunction();
  }

  ngOnInit() {

    //let param1 = this.route.snapshot.paramMap.get('SourceOfRequest');
    //let param2 = this.route.snapshot.queryParamMap.get('blah')?.toString();
    //let param1 = this.http.request.toString();
    //console.log(param2);
    //console.log('Source of request: ' +  + ' hmm');
    //this.http.put<ThermLoggingStatus>(environment.urlFunctions1 + '?SourceOfRequest=' + param1, null).subscribe(returnstuff =>{})

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


