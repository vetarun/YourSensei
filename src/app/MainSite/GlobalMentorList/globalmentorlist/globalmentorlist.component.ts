import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MentorService } from '../../../Shared/Services/mentor.service';


@Component({
  selector: 'app-globalmentorlist',
  templateUrl: './globalmentorlist.component.html',
  styleUrls: ['./globalmentorlist.component.scss']
})
export class GlobalmentorlistComponent implements OnInit {
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

  constructor(private _formBuilder: FormBuilder,
    private router: ActivatedRoute, private toaster: ToastrService, private _router: Router, private mentorservice: MentorService) { }

  ngOnInit() {
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.userRole = this.companydetails.roles;
    this.companyid = this.companydetails.companyId
    
    this.getGlobalMentorlist();

  }


  getGlobalMentorlist() {
    this.mentorservice.GetAllMentor(this.companyid).subscribe(res => {
      this.mentorlist = res;    
      console.log('global mentor list',this.mentorlist) 
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
          this.getGlobalMentorlist();
        }
      }, err => {
        this.toaster.error(err.result.message)
      })
    }
  }

  addglobalmentor() {
    this._router.navigateByUrl('/Admin/global-mentor')
  }

  applyFilter() {
   this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  cleartext() {
    this.searchKey=""
   this.dataSource.filter=this.searchKey.trim().toLowerCase();
  }


}
