import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Response } from './models/RegisterUser';
import { Observable } from 'rxjs';
import { UserAPI } from '../userAPI.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerForm;
  registeredUser?: Response;
  registerUrl = "http://localhost:4200/registerUser"

  constructor(private formBuilder: FormBuilder, private userService: UserAPI){
    this.registerForm = this.formBuilder.group({
      forenames: [],
      surname: [],
      emailAddress: [],
      telephone: [],
      dateOfBirth: [],
      password: []
    })
  }

  onSubmit() {
    
    this.userService.createUser(this.registerForm).subscribe(result => {console.log(result); this.registeredUser = result});
  }

}
