import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatTabsModule} from '@angular/material/tabs';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../../Shared/Services/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pendingapproval',
  templateUrl: './pendingapproval.component.html',
  styleUrls: ['./pendingapproval.component.scss']
})
export class PendingapprovalComponent implements OnInit {

  companydetails: any;
  tabs = ['Pending', 'Approved', 'Rejected'];
  selected = new FormControl(0);

  
  constructor(private authservice: AuthenticationService, private toastr: ToastrService, private _router: Router,private spinnerservice:NgxSpinnerService) { }
  
  displayedColumns: string[] = ['checked','firstname','lastname', 'email', 'contact1', 'companyname'];

  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  approvallist: any;
  userid: any;
  userRole
  searchKey
  companyid
  ispending:boolean=false;
  isrejected:boolean=false;
  isapproved:boolean=false;
  ischeckboxshow:boolean=true;
  pendinglist:any=[];
  ApprovedUserList:any = [];
  

  ngOnInit() {
       
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.userRole = this.companydetails.roles;
    this.companyid = this.companydetails.companyId
      this.getaprovallist();      
  }

  ApprovalType($event){
    
    if($event.index==1){
      this.isapproved=true;
      this.isrejected=false;
      this.ischeckboxshow = false;
      this.displayedColumns=['firstname','lastname', 'email', 'contact1', 'companyname'];
    }
    else if($event.index==2){
      this.isrejected = true;
      this.isapproved = false;
      this.ischeckboxshow = false;
      this.displayedColumns=['firstname','lastname', 'email', 'contact1', 'companyname'];
    }
    else{
      this.isrejected = false;
      this.isapproved = false;
      this.ischeckboxshow = true;
      this.displayedColumns= ['checked','firstname','lastname', 'email', 'contact1', 'companyname'];
    }
    this.getaprovallist();
    }

  getaprovallist() {
    
    this.authservice.GetAllApproval(this.isapproved,this.isrejected).subscribe(res => {
      this.approvallist = res; 
      
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  showOptions(event,id): void {
    
    if(event.checked==true){
      this.pendinglist.push({
        'UserID':id,'Ischecked':true
      })
    }
}


acceptApproval(a){
  
  this.pendinglist;
  this.ApprovedUserList = [];

  for (var i = 0; i < this.pendinglist.length; i++) {
    if(this.pendinglist[i].Ischecked == true){
    this.ApprovedUserList.push({ 
    'UserDetailID': this.pendinglist[i].UserID,
      'IsApproved':1,
      'CallType':'Approve',
      'CompanyID':this.pendinglist[i].CompanyID,
      'LoggedInUserId':this.userid
    })
    
  }
}
this.spinnerservice.show()
this.authservice.AddApprovalRejectList(this.ApprovedUserList).subscribe(res=>{

this.spinnerservice.hide()
if(res.code == 200) {
  this.toastr.success(res.message)
  location.reload();
} else {
  this.toastr.error(res.message)
}
})
  
}


rejectApproval(r){
  
  this.pendinglist;
  for (var i = 0; i < this.pendinglist.length; i++) {
    if(this.pendinglist[i].Ischecked == true){
    this.ApprovedUserList.push({ 
    'UserDetailID': this.pendinglist[i].UserID,
      'IsApproved':0,
      'CallType':'Reject',
      'CompanyID':this.pendinglist[i].CompanyID,
      'LoggedInUserId':this.userid
    })
  }
}
this.spinnerservice.show()
this.authservice.AddApprovalRejectList(this.ApprovedUserList).subscribe(res=>{
  
  this.spinnerservice.hide()
  if (res.code == 200) {   
    this.toastr.success(res.message)
    location.reload();
  } else {
    this.toastr.error(res.message)
  }
})
}


  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  cleartext() {
    this.searchKey=""
    this.dataSource.filter=this.searchKey.trim().toLowerCase();
  }



  isAllSelected() {
    const numSelected = this.selection.selected.length;
for(var i=0;i<this.selection.selected.length;i++){  
  if( this.pendinglist.length){
var dataAlreadyExist =   this.pendinglist.find(x=> x.UserID ==  this.selection.selected[i].userdetailid);
    if(dataAlreadyExist == undefined){
      this.pendinglist.push({
        'UserID':this.selection.selected[i].userdetailid,'Ischecked':true,'CompanyID':this.selection.selected[i].companyId
      })
    }

}else {
  this.pendinglist.push({
    'UserID':this.selection.selected[i].userdetailid,'Ischecked':true,'CompanyID':this.selection.selected[i].companyId
  })

}

}
    if(this.dataSource!=undefined){
      const numRows = this.dataSource.data.length;  
      return numSelected === numRows;
    }else{
      return false
    }
     
     
     
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :      
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    
    this.selection.selected.forEach(s => console.log(s.name));
  }



}
