import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  companydetails:any
  isInitialPassword:boolean=false
  isSubscriptionExpire: boolean=false;
  constructor(private modalService: NgbModal,private _router:Router) {     
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    
    if(this.companydetails!=null){
      this.isInitialPassword = this.companydetails.isInitialPassword;
      if(this.isInitialPassword){        
        this.modalService.open(this.templateRef, { backdrop: 'static', size: "lg", ariaLabelledBy: 'modal-basic-title' ,keyboard:false});
         
       }
    }
  }

  @ViewChild("template", null) templateRef: TemplateRef<any>;
  ngOnInit() {   
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    
    if(this.companydetails!=null){
      
      this.isInitialPassword = this.companydetails.isInitialPassword;

      if(this.isInitialPassword){        
        this.modalService.open(this.templateRef, { backdrop: 'static', size: "lg", ariaLabelledBy: 'modal-basic-title' ,keyboard:false});
         
       }
    }
  }

}
