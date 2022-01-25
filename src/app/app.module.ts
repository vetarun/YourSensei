import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MaterialModule } from '../app/Shared/modules/material.module';
import { BeltrulesComponent } from './Admin/BeltRules/beltrules/beltrules.component';
import { StructureofyoursenseiComponent } from './MainSite/StructureOfYourSensei/structureofyoursensei/structureofyoursensei.component';
import { TrackComponent } from './MainSite/Tracks/track/track.component';
import { MentortrackcategoryComponent } from './MainSite/MentorTracks/mentortrackcategory/mentortrackcategory.component';
import { ResetquizassessmentComponent } from './Admin/Quiz/ResetQuizAssessment/resetquizassessment/resetquizassessment.component';





@NgModule({
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    //FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added    
    MaterialModule,
    //CommonModule,
    BrowserModule
  ],
  entryComponents:[],
  declarations: [AppComponent],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
