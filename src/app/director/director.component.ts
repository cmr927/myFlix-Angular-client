import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {directorName: string, directorBio: string, directorBirth: any, directorDeath: any},
    public dialog: MatDialog) { }

  ngOnInit(): void {

  }

}
