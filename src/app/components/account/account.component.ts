import { ChangePasswordRequest } from './../../models/services/user/change-password-request';
import { UpdateMemberRequest } from './../../models/services/phrase/update-member-request';
import { PhraseService } from './../../services/phrase.service';
import { JwtTokenService } from './../../services/jwt-token.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/validators/must-match-validator';
import { DomSanitizer } from '@angular/platform-browser';
import { Member } from 'src/app/models/services/phrase/member-response';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  member: Member;
  accountFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  submitted = false;
  isLoading = false;
  isSaving = false;

  isChangingPassword = false;
  passwordSubmitted = false;
  passwordChanged = false;
  errorChangingPassword = false;

  imageUrl: any;
  returnUrl: string;
  fileBlob: Blob;
  errorMessage: string;
  base64textString: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private phraseService: PhraseService, private tokenService: JwtTokenService,
    private sanitizer: DomSanitizer) {
    this.createForm();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.phraseService.getMember(this.tokenService.getUserId()).subscribe(response => {
      this.member = response;
      const objectURL = 'data:image/png;base64,' + this.member.picture;
      //this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.imageUrl = objectURL;
      this.accountFormGroup.patchValue({
        firstName: this.member.firstName,
        lastName: this.member.lastName
      });
      this.isLoading = false;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.accountFormGroup.invalid) {
      return;
    }

  }

  save() {
    this.isSaving = true;
    if (this.member.picture) {
      this.base64textString = this.member.picture;
    }

    let request = new UpdateMemberRequest(
      this.tokenService.getUserId(),
      this.form['firstName'].value,
      this.form['lastName'].value,
      this.base64textString,
    );

    this.phraseService.updateMemberGeneralAttributes(request)
      .subscribe(() =>
        this.isSaving = false)
  }


  changePassword() {
    if (this.passwordFormGroup.invalid) {
      return;
    }
    this.errorMessage = "";
    this.errorChangingPassword = false;
    this.passwordChanged = false;
    this.isChangingPassword = true;
    this.passwordSubmitted = true;

    let changePasswordRequest = new ChangePasswordRequest(
      this.tokenService.getUserId(),
      this.passwordForm['currentPassword'].value,
      this.passwordForm['newPassword'].value
    );

    this.userService.changePassword(changePasswordRequest)
      .subscribe(response => {
        this.isChangingPassword = false
        this.passwordChanged = true;
      }, error => {
          console.log(error);
          this.isChangingPassword = false;
          this.errorChangingPassword = true;
          this.errorMessage = error;
        });

  }

  recieveFile(file: File) {
    const urlReader = new FileReader();
    urlReader.readAsDataURL(file);
    urlReader.onload = () => {
      this.imageUrl = urlReader.result;
    };

    var stringReader = new FileReader();
    stringReader.onload = this.handleFile.bind(this);
    stringReader.readAsBinaryString(file);
  }

  handleFile(event) {
    var binaryString = event.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
  }

  get form() { return this.accountFormGroup.controls; }
  get passwordForm() { return this.passwordFormGroup.controls; }

  private createForm() {
    this.accountFormGroup = this.formBuilder.group({
      userName: [''],
      email: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      commentScore: [''],
      banterScore: ['']
    });
    this.passwordFormGroup = this.formBuilder.group({
      currentPassword: ['', Validators.compose(
        [Validators.required, Validators.minLength(8)]
      )],
      newPassword: ['', Validators.compose(
        [Validators.required, Validators.minLength(8)]
      )]
    });
  }
}
