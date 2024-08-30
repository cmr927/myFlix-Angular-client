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
    /**
   * Array to hold the list of movies fetched from the API.
   */
  @Injectable({providedIn: 'root'})
  movies: any[] = [];
    /**
   * Array to hold the list of favorite movies fetched from the API.
   */
  favoriteMovies: any[] = [];
    /**
   * Input property to check if the component is being used in the profile view.
   */
  @Input() isProfile = false
    /**
   * Creates an instance of MovieCardComponent.
   * @param movieApiData The MovieAPIService instance to interact with the movie API.
   * @param dialog The MatDialog instance to manage dialogs.
   * @param router The Router instance for navigation.
   * @param snackBar The MatSnackBar instance to show snack bar notifications.
   */
  constructor(
    public movieApiData: MovieAPIService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }
    /**
   * Angular lifecycle hook that runs after component initialization.
   * Fetches all movies and the user's favorite movies.
   */

ngOnInit(): void {
  this.getMovies();
  this.getFavoriteMovies();
}


  /**
   * Fetches the list of all movies from the API when the /movies page loads
   */
getMovies(): void {
  this.movieApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  };

  /**
   * Fetches the list of the user's favorite movies from the API when the /movies page loads
   */
getFavoriteMovies(): void {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  this.movieApiData.getUser(user.Username).subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
    });
  };


/**
   * Opens a dialog displaying the director's details when the director button is clicked 
   * @param directorName The name of the director.
   * @param directorBio The biography of the director.
   * @param directorBirth The birth date of the director.
   * @param directorDeath The death date of the director (if applicable).
   */
openDirectorDialog(directorName, directorBio, directorBirth, directorDeath): void {
  this.dialog.open(DirectorComponent, {
    data: {directorName: directorName, directorBio: directorBio, directorBirth, directorDeath},
    width: '280px'
  });
};

  /**
   * Opens a dialog displaying the genre's details when the genre button is clicked
   * @param genreName The name of the genre.
   * @param genreDescription The description of the genre.
   */
openGenreDialog(genreName, genreDescription): void {
  this.dialog.open(GenreComponent, {
    data: {genreName: genreName, genreDescription: genreDescription},
    width: '280px'
  });
};


  /**
   * Opens a dialog displaying the synopsis of the movie when the synopsis button is clicked
   * @param synopsis The synopsis of the movie.
   */
openSynopsisDialog(synopsis): void {
  this.dialog.open(SynopsisComponent, {
    data: {synopsis: synopsis},
    width: '280px'
  });
};

  /**
   * Toggles the movie in the user's list of favorite movies.
   * Adds the movie if it's not already a favorite; removes it if it is.
   * @param movie The movie object to be toggled.
   */  
toggleFav(movie: any): void {
    if (this.isFav(movie._id)){
      this.deleteFavMovies(movie)
    }
    else {
      this.addFavMovies(movie)
    }
};

/**
   * Adds a movie to the user's list of favorite movies when the heart button is clicked
   * @param movie The movie object to be added to favorites.
   */
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

  /**
   * Removes a movie from the user's list of favorite movies when the heart button is clicked
   * @param movie The movie object to be removed from favorites.
   */ 
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

/**
   * Checks if a movie is in the user's list of favorite movies via the heart button
   * @param movieID The ID of the movie to check.
   * @returns A boolean indicating whether the movie is a favorite.
   */
isFav(movieID: any): boolean {
  return this.favoriteMovies.includes(movieID)
};
}
