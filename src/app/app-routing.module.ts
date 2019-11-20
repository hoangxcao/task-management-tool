import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-task', component: TaskAddComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksListComponent, canActivate: [AuthGuard] },
  { path: 'edit-task/:id', component: TaskEditComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
