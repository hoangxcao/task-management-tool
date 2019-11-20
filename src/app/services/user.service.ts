import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // Define API
  apiURL = 'http://localhost:44312';

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(this.apiURL + '/api/register', user);
  }

}
