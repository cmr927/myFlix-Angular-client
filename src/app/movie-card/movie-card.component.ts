import { Component, OnInit } from '@angular/core';
import { MovieAPIService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public movieApiData: MovieAPIService,
    public dialog: MatDialog,
    public router: Router
  ) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.movieApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

// This is the function that will open the dialog when the director button is clicked  
openDirectorDialog(directorName, directorBio, directorBirth, directorDeath): void {
  this.dialog.open(DirectorComponent, {
    data: {directorName: directorName, directorBio: directorBio, directorBirth, directorDeath},
    width: '280px'
  });
};

// This is the function that will open the dialog when the genre button is clicked  
openGenreDialog(genreName, genreDescription): void {
  this.dialog.open(GenreComponent, {
    data: {genreName: genreName, genreDescription: genreDescription},
    width: '280px'
  });
};

// This is the function that will open the dialog when the synopsis button is clicked  
openSynopsisDialog(synopsis): void {
  this.dialog.open(SynopsisComponent, {
    data: {synopsis: synopsis},
    width: '280px'
  });
};
}
