import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterUser } from './models/RegisterUser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm;
  registeredUser?: RegisterUser;
  registerUrl = "http://localhost:4200/registerUser"

  constructor(private formBuilder: FormBuilder, private http: HttpClient){
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
    this.registerUser(this.registerForm)
        .subscribe(
          result => {
            console.log(result)
          });
  }

  registerUser(form: FormGroup): Observable<RegisterUser>{
    return this.http.post<RegisterUser>(this.registerUrl, form.value);
  }

}
