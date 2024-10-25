import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { HomePageModule } from './home/home.module';

import { AddClienteModalComponent } from './add-cliente-modal/add-cliente-modal.component';
import { EditClienteModalComponent } from './edit-cliente-modal/edit-cliente-modal.component';
import { SearchModalComponent } from './search-modal/search-modal.component';

@NgModule({
  declarations: [AppComponent, AddClienteModalComponent, EditClienteModalComponent, SearchModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule, 
    HomePageModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
