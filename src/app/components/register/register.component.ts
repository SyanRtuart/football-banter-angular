import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MustMatch } from 'src/app/validators/must-match-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    console.log('registering');
    this.register();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  register() {
    this.userService.register(this.registerForm.value).subscribe(response => {
      console.log('registered successfully');
      this.router.navigate(['/login']);
    });
  }

  get f() { return this.registerForm.controls; }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      login: [''],
      email: ['', Validators.compose(
        [Validators.email, Validators.required]
      )],
      confirmEmail: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.compose(
        [ Validators.required, Validators.minLength(8)]
      )],
      confirmPassword: ['', ]
    }, {
      validator: [MustMatch('password', 'confirmPassword'), MustMatch('email', 'confirmEmail')]
    });
  }
}

