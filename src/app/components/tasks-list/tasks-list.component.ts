import { Component, OnInit, ViewChild } from '@angular/core';
import { RestApiService } from "../../services/rest-api.service";
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { TaskEditComponent } from '../task-edit/task-edit.component'

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  faList = faList;
  faEdit = faEdit;
  faTrash = faTrash;
  faEye = faEye;
  Task: any = [];

  displayedColumns: string[] = ['QuoteNumber', 'QuoteType', 'Contact', 'TaskDescription', 'TaskType', 'DueDate', 'Action'];
  dataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public restApi: RestApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadTasks();
  }

  // Get tasks list
  loadTasks() {
    return this.restApi.getTasks()
      .subscribe(
        data => {
          this.Task = data;
          this.dataSource = new MatTableDataSource<any>(this.Task);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
  }

  // Delete task
  deleteTask(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.restApi.deleteTask(id)
        .subscribe(
          data => {
            this.loadTasks()
          })
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id): void {
    this.restApi.getTask(id)
      .subscribe(
        data => {
          const dialogRef = this.dialog.open(TaskDetailsComponent, {
            data: data[0]
          });

          dialogRef.afterClosed()
            .subscribe(
              result => {
              });
        })
  }

}
