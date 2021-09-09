import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CookieService} from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { ClientActivityComponent } from './client-activity/client-activity.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AdminComponent } from './admin/admin.component';
import { CompanyInfoComponent } from './company-info/company-info.component';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientActivityComponent,
    UserlistComponent,
    AdminComponent,
    CompanyInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxQRCodeModule
  ],
  providers:[CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
