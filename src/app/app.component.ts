import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private route: ActivatedRoute)
  {
    //might be using this to detect client specs for logging purposes
    //this.epicFunction();
  }

  ngOnInit() {
    //let param1 = this.route.snapshot.paramMap.get('SourceOfRequest');
    //let param2 = this.route.snapshot.queryParamMap.get('SourceOfRequest')?.toString();
    //let param1 = this.http.request.toString();
    //console.log('Source of request: ' + param1);
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


