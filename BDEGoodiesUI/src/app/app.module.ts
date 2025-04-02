import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Composants 
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

// ANgular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { EvenementComponent } from './evenement/evenement.component';
import { ListEvenementsComponent } from './pages/list-evenements/list-evenements.component';
import { GoodieComponent } from './goodie/goodie.component';
import { ListGoodiesComponent } from './pages/list-goodies/list-goodies.component';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatChipListbox } from '@angular/material/chips';

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
    ListGoodiesComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
