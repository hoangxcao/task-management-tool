import { Component, Inject } from '@angular/core';
import { Task } from '../../models/task'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})

export class TaskDetailsComponent {

  constructor(
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
