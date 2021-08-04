import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { CookieService} from 'ngx-cookie-service';
import { YesComponent } from './yes/yes.component';
import { NoComponent } from './no/no.component';
import { MaybeComponent } from './maybe/maybe.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HomeComponent,
    YesComponent,
    NoComponent,
    MaybeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
