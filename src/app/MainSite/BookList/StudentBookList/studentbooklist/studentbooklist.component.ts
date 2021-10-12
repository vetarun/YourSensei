import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { MaterialModule } from '../../../../Shared/modules/material.module';
import { BookService } from '../../../../Shared/Services/book.service';

@Component({
  selector: 'app-studentbooklist',
  templateUrl: './studentbooklist.component.html',
  styleUrls: ['./studentbooklist.component.scss']
})
export class StudentbooklistComponent implements OnInit {

  loggedinUserDetails: any;
  mentorID: any;
  searchKey: any;
  mentorDisplayedColumns: string[] = ['coverImageUrl', 'title', 'author', 'publisher', 'year'];
  mentorDataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  constructor(private bookService: BookService, private _router: Router, private materialModule: MaterialModule) { }

  ngOnInit() {
    this.loggedinUserDetails = JSON.parse(localStorage.getItem("companyDetails"))
    this.mentorID = this.loggedinUserDetails.mentorID;

    this.getCompanyLibraryBooksByMentorID();
  }

  getCompanyLibraryBooksByMentorID(){
    this.bookService.GetCompanyLibraryBooksByMentorID(this.mentorID, true, true).subscribe(res => {
      
      res.forEach(function (value) {
        var imageUrl = environment.baseUrl + 'Images/' + value.coverImageUrl;
        value.coverImageUrl = imageUrl;
      });

      this.mentorDataSource = new MatTableDataSource(res)
      this.mentorDataSource.sort = this.sort;
      this.mentorDataSource.paginator = this.paginator;
    });
  }

  applyFilter() {
    this.mentorDataSource.filter = this.searchKey.trim().toLowerCase();
  }

  cleartext() {
    this.searchKey = ""
    this.mentorDataSource.filter = this.searchKey.trim().toLowerCase();
  }
}
