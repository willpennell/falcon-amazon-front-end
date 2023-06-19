import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from './models/RegisterUser';
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
      forenames: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      dateOfBirth: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.userService.createUser(this.registerForm).subscribe(result => {console.log(result); this.registeredUser = result});
  }

}
