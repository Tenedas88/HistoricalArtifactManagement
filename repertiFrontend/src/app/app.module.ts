import { RouterModule, Routes} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RepertiComponent} from '../reperti/reperti.component';
import {NuovoRepertoComponent} from '../nuovo-reperto/nuovo-reperto.component';
import {DBCRUDService} from '../dbcrud.service';
import {FormsModule} from '@angular/forms';

const repertiRoutes : Routes = [
  {path: '', component: RepertiComponent, pathMatch: 'full'},
  {path: 'nuovo-reperto', component: NuovoRepertoComponent, pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    RepertiComponent,
    NuovoRepertoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(repertiRoutes),
    FormsModule
  ],
  providers: [DBCRUDService],
  bootstrap: [AppComponent]
})
export class AppModule { }
