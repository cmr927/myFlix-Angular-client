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
  };

  isFav(movie: any): boolean {

    return this.favoriteMoviesIDs.includes(movie._id);
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

// This is the function that toggles the movie in the user's favorites  
toggleFav(movie: any): void {
  console.log("toggleFav", movie)
  const isFavorite = this.isFav(movie);
    this.addFavMovies(movie);
};

// This is the function that will add the movie to the user's favorites when the heart button is clicked  
addFavMovies(movie: any): void {
  console.log("addFavMovies")
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user) {
    console.log("if statement")
    this.movieAPIData.addFavoriteMovies(user.Username, movie._id).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavMovies(); // Refresh favorite movies after adding a new one
      this.snackBar.open(`${movie.movieName} has been added to your favorites`, 'OK', {
        duration: 1000,
      });
    });
  }
}
}
