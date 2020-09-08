import { JwtTokenService } from './../../services/jwt-token.service';
import { User } from './../../models/services/user/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/validators/must-match-validator';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup;
  submitted = false;
  isLoading = false;
  user: User;
  imageUrl: any;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private tokenService: JwtTokenService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUser(this.tokenService.getEmail()).subscribe(response => {
      this.user = response;

      this.accountForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName
      });
      this.isLoading = false;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.accountForm.invalid) {
      return;
    }

    //this.register();
  }

  changePassword() {

  }

  addPicture() {

  }

  recieveFile(file: File) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (event) => {
      this.imageUrl = event.target.result;
    };

    this.userService.uploadImage(file).subscribe();
  }

  get f() { return this.accountForm.controls; }

  private createForm() {
    this.accountForm = this.formBuilder.group({
      userName: [''],
      email: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      commentScore: [''],
      banterScore: [''],
      password: ['', Validators.compose(
        [Validators.required, Validators.minLength(8)]
      )],
      confirmPassword: ['', Validators.required]
    }, {
      validator: [MustMatch('password', 'confirmPassword')]
    });
  }
}
