import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() buttonCaption: string;
  @Output() selectedFile = new EventEmitter<File>();

  file: File;

  constructor() { }

  ngOnInit(): void {
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
    this.selectedFile.emit(this.file);
  }

}
