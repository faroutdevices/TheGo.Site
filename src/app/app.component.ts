import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'thegosite1';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    let param1 = this.route.snapshot.paramMap.get('SourceOfRequest');
    console.log('Source of request: '+ param1 + 'mmmmm');


  }


}
