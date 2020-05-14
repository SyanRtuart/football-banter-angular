import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-create-banter',
  templateUrl: './create-banter.component.html',
  styleUrls: ['./create-banter.component.css']
})
export class CreateBanterComponent {
  constructor(public dialogRef: MatDialogRef<CreateBanterComponent>) {}

  submit(): void {
    console.log('submitting your phrase to the api')
  }

}
