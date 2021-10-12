import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MentorService } from '../../../Shared/Services/mentor.service';


@Component({
  selector: 'app-externalmentorlist',
  templateUrl: './externalmentorlist.component.html',
  styleUrls: ['./externalmentorlist.component.scss']
})
export class ExternalmentorlistComponent implements OnInit {
  companydetails: any;
  userid: any;
  userRole: any;
  companyid: any;

   
   displayedColumns: string[] = ['firstName','lastName','email','phone','isActive', 'action'];
   dataSource: MatTableDataSource<any>;
   @ViewChild(MatSort, { static: true }) sort: MatSort
   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  mentorlist: any;
  searchKey;
  mentrid: any;
  numberOfMentors:number
  exsitingNumberOfMentors:number
  constructor(private _formBuilder: FormBuilder,
    private router: ActivatedRoute, private toaster: ToastrService, private _router: Router, private mentorservice: MentorService) { }

  ngOnInit() {
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.userRole = this.companydetails.roles;
    this.companyid = this.companydetails.companyId
    this.numberOfMentors=this.companydetails.numberOfExternalMentors
    
    // this.mentrid = this.router.snapshot.paramMap.get('id');
    // if (this.mentrid != null) {
    //   this.mentorservice.GetMentorbyid(this.mentrid).subscribe(res => {
    //     this.model = res;
    //   })
    // }
    
    this.getMentorlist();

  }


  getMentorlist() {
    this.mentorservice.GetAllMentor(this.companyid).subscribe(res => {
      this.mentorlist = res; 
      this.exsitingNumberOfMentors=res.length   
       this.dataSource = new MatTableDataSource(res)
       this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  DeleteMentor(id) {
    
    if (confirm('Are you sure to delete this employee?')) {
      this.mentorservice.DeleteMentor(id).subscribe(res => {
        if (res.code == 200) {
          this.toaster.success(res.message)
          this.getMentorlist();
        }
      }, err => {
        this.toaster.error(err.result.message)
      })
    }
  }

  addmentor() {
    this._router.navigateByUrl('/Main/add-mentor')
  }

  applyFilter() {
   this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  cleartext() {
    this.searchKey=""
   this.dataSource.filter=this.searchKey.trim().toLowerCase();
  }


}
