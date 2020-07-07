import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  matcher  = new MyErrorStateMatcher();


  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      email:  ['', Validators.email],
      firstName:  ['', Validators.required],
      lastName:  ['', Validators.required],
      password:  ['', Validators.required],
      confirmPassword: ['']
    }, {validator: this.checkPasswords});
  }

  register() {
    console.log('registering');
  }


  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
