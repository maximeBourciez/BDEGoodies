import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListEvenementsComponent } from './pages/list-evenements/list-evenements.component';
import { ListGoodiesComponent } from './pages/list-goodies/list-goodies.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  { path: 'events', component: ListEvenementsComponent },
  { path: 'goodies', component: ListGoodiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
