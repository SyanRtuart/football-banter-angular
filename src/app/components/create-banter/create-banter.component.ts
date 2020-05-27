import { CreatePhraseRequest } from './../../models/create-phrase-request';
import { DialogData } from './../../models/dialog-data';
import { Phrase } from './../../models/phrase';
import { BanterService } from 'src/app/services/banter.service';
import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-banter',
  templateUrl: './create-banter.component.html',
  styleUrls: ['./create-banter.component.css']
})
export class CreateBanterComponent {
  constructor(public dialogRef: MatDialogRef<CreateBanterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private banterService: BanterService) { }

  model = new CreatePhraseRequest();

  submit(): void {
    console.log('match id = ' + this.data.matchId + 'team id = ' + this.data.teamId);
    this.setValues();
    this.banterService.add(this.model).subscribe(response =>
      console.log(response));
  }

  // TODO: Fix this, not correct pattern
  setValues() {
    // TODO: Always True - Need to add a check box on the form?
    this.model.positive = true;
    this.model.matchId = 1;
    this.model.teamId =1;

    // this.model.matchId = this.data.matchId;
    // this.model.teamId = this.data.teamId;
  }
}
