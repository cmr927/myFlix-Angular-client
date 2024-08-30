import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})

/**
 * Component to display genre details in a dialog.
 */

export class GenreComponent implements OnInit {
   /**
   * Creates an instance of GenreComponent
   * @param data The data passed to the dialog, containing genre details such as name and description
   * @param dialog The MatDialog instance to manage the dialog
   */

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {genreName: string, genreDescription: string},
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
