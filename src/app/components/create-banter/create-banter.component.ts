import { Phrase } from '../../models/services/banter/phrase';
import { CreatePhraseRequest } from '../../models/services/banter/create-phrase-request';
import { DialogData } from './../../models/dialog-data';
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
  phrase = new Phrase();

  submit(): void {
    this.setValues();
    this.banterService.add(this.model).subscribe(response => {
      this.phrase.id = response;
      console.log("CreateBanterComponent -> submit -> response", response)
    });
  }

  // TODO: Fix this, not correct pattern
  setValues() {
    // TODO: Always True - Need to add a check box on the form?
    this.model.positive = true;

    this.model.matchId = this.data.matchId;
    this.model.teamId = this.data.teamId;

    // TODO: When the API returns the created object then we can change this
    this.phrase.description = this.model.description;
    this.phrase.positive = this.model.positive;
    this.phrase.score = 1;
    //this.phrase.id = 0;
  }
}
