import { Component, Injectable, OnInit, Input } from '@angular/core';
import { MovieAPIService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Injectable({providedIn: 'root'})
  movies: any[] = [];
  favoriteMovies: any[] = [];
  @Input() isProfile = false
  constructor(
    public movieApiData: MovieAPIService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

ngOnInit(): void {
  this.getMovies();
  this.getFavoriteMovies();
}

// This is the function that will get all movies when the /movies page loads
getMovies(): void {
  this.movieApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  };
// This is the function that will get all favotie movies when the /movies page loads
getFavoriteMovies(): void {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  this.movieApiData.getUser(user.Username).subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      return resp.user.FavoriteMovies
    });
  };

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
    if (this.isFav(movie._id)){
      this.deleteFavMovies(movie)
    }
    else {
      this.addFavMovies(movie)
    }
};

// This is the function that will add the movie to the user's favorites when the heart button is clicked  
addFavMovies(movie: any): void {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user) {
    this.movieApiData.addFavoriteMovies(movie, movie._id, user.Username).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavoriteMovies();
      this.snackBar.open(`${movie.Title} has been added to your favorites`, 'OK', {
        duration: 1000,
      });
    });
  }
};

// This is the function that will add the movie to the user's favorites when the heart button is clicked  
deleteFavMovies(movie: any): void {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user) {
    this.movieApiData.deleteMovie(movie._id, user.Username).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavoriteMovies();
      this.snackBar.open(`${movie.Title} has been removed from your favorites`, 'OK', {
        duration: 1000,
      });
    });
  }
};
// This is the function that will indicate via the heart button whether or not a movie is a favorite
isFav(movieID: any): boolean {
  return this.favoriteMovies.includes(movieID)
};
}
