import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CompanyDetailService } from '../../../../Shared/Services/companydetail.service'; 
import { EmployeeService } from '../../../../Shared/Services/employee.service';
import { QuizService } from '../../../../Shared/Services/quiz.service';

@Component({
  selector: 'app-resetquizassessment',
  templateUrl: './resetquizassessment.component.html',
  styleUrls: ['./resetquizassessment.component.scss']
})
export class ResetquizassessmentComponent implements OnInit {
  displayedColumns: string[] = ['quizname', 'bookname', 'action'];
  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  constructor(
    private CompanyDetailService : CompanyDetailService,
    private EmployeeService : EmployeeService,
    private QuizService : QuizService 
  ) { }

  ngOnInit() {
    this.CompanyDetailService.GetAllCompanies().subscribe((data: any)=> {
      this.companylist = data;
      console.log('Company List',this.companylist);
      this.CompanyID = this.companylist[0].id;

      this.companylist.push({
        id: "00000000-0000-0000-0000-000000000000", companyname: "Individual User"
      })
      this.getemployees();
    })
  }

  CompanyID: any;
  EmployeeID: any;
  companylist: any = [];
  employeelist: any =[];
  quizList: any =[];
  isIndividual: boolean = false;

  getemployees(){
    this.EmployeeService.GetAllEmployee(this.CompanyID).subscribe((data: any)=> {
      this.employeelist = data;
      console.log('Employee List',this.employeelist);
      this.EmployeeID = this.employeelist[0].userDetialID;

      this.getquizlistbyUserIDandCompID();
    })
  }


  getquizlistbyUserIDandCompID(){
    this.QuizService.GetIncompleteQuizByUserIDandCompID(this.EmployeeID, this.CompanyID).subscribe((data: any)=> {

      this.dataSource = new MatTableDataSource();
      this.dataSource.data = data
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.quizList = data;
      console.log('Specific Data', this.quizList);

      if(this.quizList.length == 0){
        console.log("no record")
      }
    })
  }

  DeleteQuiz(id){
    if (confirm("Are you sure you want to reset the quiz progress ?")) {
      this.QuizService.DeleteQuizStatus(id).subscribe((data: any)=> {
        console.log('Record Status Deleted', data);
        this.getquizlistbyUserIDandCompID();
      })
    } else {
      console.log("You pressed Cancel!");
    }
  }
}
