import { MatTableDataSource, MatRow } from '@angular/material/table';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() tableData;
  @Input() columnHeaders;
  @Input() navigationFieldName;
  @Output() onRowClicked = new EventEmitter;

  objectKeys = Object.keys;
  dataSource;
  constructor() { }

  ngOnInit(): void {
    console.log(this.tableData);
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isBlob(val1: string): boolean {
    const isBlob = val1.toUpperCase().includes('BLOB');
    return isBlob;
  }

  click(row) {
    console.log(row.id);
    this.onRowClicked.emit(row.id);
  }

}
