import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../Shared/Services/employee.service';


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {
  companydetails: any;
  totalAllowedNoOfEmployee:number
  exsitedNumberOfEmp:number
  constructor(private empservice: EmployeeService, private toastr: ToastrService, private _router: Router) { }
  displayedColumns: string[] = ['employeeCode', 'firstName','lastName', 'roleId', 'mentorId', 'credit','isActive', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  employeelist: any;
  userid: any;
  userRole
  searchKey
  companyid
  ngOnInit() {
    this.companydetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.userid = this.companydetails.userId;
    this.userRole = this.companydetails.roles;
    this.companyid = this.companydetails.companyId
    this.totalAllowedNoOfEmployee=this.companydetails.numberOfEmployees
    
      this.getemployeelist();   
   
  }

  getemployeelist() {
    this.empservice.GetAllEmployee(this.companyid).subscribe(res => {
      this.employeelist = res;
      this.exsitedNumberOfEmp=res.length     
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  DeleteEmployee(id) {
    if (confirm('Are you sure to delete this employee?')) {
      this.empservice.DeleteEmployee(id).subscribe(res => {
        if (res.code == 200) {
          this.toastr.success(res.message)
          this.getemployeelist();
        }
      }, err => {
        this.toastr.error(err.result.message)
      })
    }
  }
  addemployee() {
    this._router.navigateByUrl('/Main/add-employee')
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  cleartext() {
    this.searchKey=""
    this.dataSource.filter=this.searchKey.trim().toLowerCase();
  }
  EditEmployee(id) {   
   this._router.navigate(['/Main/addemployee', {employeeid: id }]);  
    
  }



}
