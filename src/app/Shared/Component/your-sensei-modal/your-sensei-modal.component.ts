import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-your-sensei-modal',
  templateUrl: './your-sensei-modal.component.html',
  styleUrls: ['./your-sensei-modal.component.scss']
})
export class YourSenseiModalComponent implements OnInit {
  @Input() showCloseButton:boolean=false
@Input() openModal:boolean=false
@Input() modalHeading:string
@Output() public messageEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
    
  }
close(){

//this.openModal=false
this.messageEvent.emit(false)
}

}
