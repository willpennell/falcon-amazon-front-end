import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm;

  constructor(private formBuilder: FormBuilder){
    this.registerForm = this.formBuilder.group({
      forenames: [""],
      surname: [],
      emailAddress: [],
      telephone: [],
      dateOfBirth: [],
      password: []
    })
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }

}
