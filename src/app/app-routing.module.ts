import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientActivityComponent } from './client-activity/client-activity.component';

//import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'clientactivity', component: ClientActivityComponent},

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
