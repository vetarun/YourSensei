import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrackRoutingModule } from './track-routing.module';
import { TrackComponent } from './track/track.component';

@NgModule({
  declarations: [TrackComponent],
  imports: [
    CommonModule,
    TrackRoutingModule,
    FormsModule
  ]
})
export class TrackModule { }