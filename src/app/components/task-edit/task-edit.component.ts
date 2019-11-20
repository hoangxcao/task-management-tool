import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../../services/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  taskData: any = {}

  editTaskForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.restApi.getTask(this.id).subscribe((data: {}) => {
      this.taskData = data[0];

      this.editTaskForm = this.formBuilder.group({
        Status: [data[0].Status, Validators.required],
        Quote: [data[0].Quote],
        QuoteType: [data[0].QuoteType, Validators.required],
        Contact: [data[0].Contact, Validators.required],
        TaskType: [data[0].TaskType, Validators.required],
        TaskDescription: [data[0].TaskDescription, Validators.required],
        DueDate: [data[0].DueDate, Validators.required]
      });
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.editTaskForm.controls; }

  // Update task data
  updateTask() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.editTaskForm.invalid) {
      return;
    }

    this.loading = true;
    this.taskData = this.editTaskForm.getRawValue();
    this.taskData.QuoteNumber = this.id;
    if (window.confirm('Are you sure you want to update?')) {
      this.restApi.updateTask(this.id, this.taskData)
        .subscribe(
          data => {
            this.router.navigate(['/tasks'])
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          })
    }
  }

}
