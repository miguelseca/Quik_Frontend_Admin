import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Issue from 'src/app/models/issue';
import { IssuesService } from 'src/app/services/issues.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  title = 'Issues';
  issues: Issue[] = [];
  displayedColumns = [
    'date', 'tripID', 'email', 'description', 'isClosed', 'close',
  ];
  dataSource!: MatTableDataSource<Issue>;

  @ViewChild('page') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private issueService: IssuesService,
    private matDialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllIssues();
  }
  getAllIssues(): void {
    this.issueService.getAllIssues().subscribe((i) => {
      this.dataSource = new MatTableDataSource(this.issues = i);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onCloseIssue(issue: Issue): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    // dialogConfig.height = '50%';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      entity: issue,
      message: `Do you really want to close this issue?`,
    };

    const umDialog = this.matDialog.open(ConfirmComponent, dialogConfig);

    umDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.logSnacks(`Issue from ${issue.email} closed.`, 3000);
        this.issueService.updateIssue(issue).subscribe(() => {
          this.getAllIssues();
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  logSnacks(message: string, time: number): void {
    this.snackBar.open(message, '', { panelClass: 'snacks', duration: time });
  }

}
