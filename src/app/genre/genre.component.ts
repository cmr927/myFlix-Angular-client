import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {genreName: string, genreDescription: string},
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
