import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../../services/rest-api.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  addTaskForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    public restApi: RestApiService,
    public router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.addTaskForm = this.formBuilder.group({
      Status: ['', Validators.required],
      Quote: [''],
      QuoteType: ['', Validators.required],
      Contact: ['', Validators.required],
      TaskType: ['', Validators.required],
      TaskDescription: ['', Validators.required],
      DueDate: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addTaskForm.controls; }

  addTask() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.addTaskForm.invalid) {
      return;
    }

    this.loading = true;
    this.restApi.createTask(this.addTaskForm.getRawValue())
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
