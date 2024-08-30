import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})

/**
 * Component to display synopsis details in a dialog
 */

export class SynopsisComponent implements OnInit {
     
  /**
   * Creates an instance of SynopsisComponent
   * @param data The data passed to the dialog, containing the synopsis description
   * @param dialog The MatDialog instance to manage the dialog
   */

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {synopsis: string},
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
