import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
//import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: ':sourceofrequest', component: WelcomeComponent},

  //{
    //path: '',
    //runGuardsAndResolvers: 'always',
    //canActivate: [AuthGuard],
    //children: [
    //  {path: ':sourceofrequest', component: WelcomeComponent}
    //]
  //},
  // {path: 'errors', component: TestErrorsComponent},
  // {path: 'not-found', component: NotFoundComponent},
  // {path: 'server-error', component: ServerErrorComponent},
  // {path: '**', component: NotFoundComponent, pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
