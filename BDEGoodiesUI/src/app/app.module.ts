import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Composants
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AddReservationComponent } from './pages/add-reservation/add-reservation.component';
import { ListEvenementsComponent } from './pages/list-evenements/list-evenements.component';
import { GoodieComponent } from './goodie/goodie.component';
import { ListGoodiesComponent } from './pages/list-goodies/list-goodies.component';
import { AddEvenementComponent } from './pages/add-evenement/add-evenement.component';
import { AddGoodieComponent } from './pages/add-goodie/add-goodie.component';
import { EditReservationComponent } from './pages/edit-reservation/edit-reservation.component';
import { EvenementComponent } from './evenement/evenement.component';
import { ListEtudiantsComponent } from './pages/list-etudiants/list-etudiants.component';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatChipListbox } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    // Composants
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EvenementComponent,
    ListEvenementsComponent,
    GoodieComponent,
    ListGoodiesComponent,
    AddReservationComponent,
    AddEvenementComponent,
    AddGoodieComponent,
    EditReservationComponent,
    ListEtudiantsComponent,
  ],
    imports: [

        BrowserModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,

        // Angular Material
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        DragDropModule,
        MatGridListModule,
        MatTableModule,
        MatChipsModule,
        MatChipListbox,
        MatSnackBarModule,
        MatListModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
