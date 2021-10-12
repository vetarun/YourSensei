import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { InitialAssessmentService } from '../../../Shared/Services/initial-assessment.service';

@Component({
  selector: 'app-reviewinitialassessment',
  templateUrl: './reviewinitialassessment.component.html',
  styleUrls: ['./reviewinitialassessment.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReviewinitialassessmentComponent implements OnInit {
  isTableExpanded = false;
  displayedColumns: string[] = ['companyname', 'employeeName', 'email', 'registered', 'score','createdDate', 'action'];
  dataSource: MatTableDataSource<any>;
  displayedAnswerColumns: string[] = ['questionName', 'optionValue', 'score'];
  AnswerdataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  List: Array<any> = [];
  searchKey: any;
  score: any;
  
  constructor(private initialAssessmentService: InitialAssessmentService) { }

  ngOnInit() {
    this.getInitialAssessmentAnswer(0, true);
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  cleartext() {
    this.searchKey = ""
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  
  getInitialAssessmentAnswer(sequenceNumber, isActive){
    this.initialAssessmentService.GetInitialAssessmentAnswer(sequenceNumber, isActive).subscribe(res => {
      
      if(sequenceNumber === 0){
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = res
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else{
        this.AnswerdataSource = new MatTableDataSource();
        this.AnswerdataSource.data = res
        // this.AnswerdataSource.sort = this.sort;
        // this.AnswerdataSource.paginator = this.paginator;
      }
    })
  }

  showInitialAssessmentAnswer(element){
    this.dataSource.data.forEach(field => {
      if (field != element) {
        
        field.isExpanded = false;
      }
    });
    element.isExpanded = !element.isExpanded;

    this.getInitialAssessmentAnswer(element.sequenceNumber, true);
  }
}
