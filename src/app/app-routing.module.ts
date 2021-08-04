import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { YesComponent } from './yes/yes.component';
import { NoComponent } from './no/no.component';
import { MaybeComponent } from './maybe/maybe.component';

//import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'yes', component: YesComponent},
  {path: 'no', component: NoComponent},
  {path: 'maybe', component: MaybeComponent},

  {
    path: '',
    //runGuardsAndResolvers: 'always',
    //canActivate: [AuthGuard],
    children: [
      {path: ':sourceofrequest', component: HomeComponent},
      //{path: 'welcome', component: WelcomeComponent}
    ]
  },
   //{path: 'errors', component: TestErrorsComponent},
  // {path: 'not-found', component: NotFoundComponent},
  // {path: 'server-error', component: ServerErrorComponent},
  // {path: '**', component: NotFoundComponent, pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
