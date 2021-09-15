import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBodyComponent } from './app-body/app-body.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'main', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main',
    component: AppBodyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
