import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListEvenementsComponent } from './pages/list-evenements/list-evenements.component';
import { ListGoodiesComponent } from './pages/list-goodies/list-goodies.component';
import { EvenementComponent } from './evenement/evenement.component';
import { AddReservationComponent } from './pages/add-reservation/add-reservation.component';
import { AddEvenementComponent } from './pages/add-evenement/add-evenement.component';
import {AddGoodieComponent} from './pages/add-goodie/add-goodie.component';
import {EditReservationComponent} from './pages/edit-reservation/edit-reservation.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},

  // Goodies
  { path: 'goodies', component: ListGoodiesComponent },
  { path: 'add-goodie', component: AddGoodieComponent },

  // Réservations
  { path: 'event/:id/addetudiant', component: AddReservationComponent },
  { path: 'edit-reservation/:id', component: EditReservationComponent },

  // Etudiants

  // Evenements
  { path: 'add-event', component: AddEvenementComponent },
  { path: 'events', component: ListEvenementsComponent },
  { path: 'event/:id', component: EvenementComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
