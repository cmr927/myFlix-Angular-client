import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * API URL that provides data for the client app.
 */
const apiUrl = 'https://movies-myflix-cmr927-6d25967ba551.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to interact with the movie API.
 * Provides methods to register, login, and retrieve movie-related data.
 */

export class MovieAPIService {

  /**
   * Injects the HttpClient module, which allows making HTTP requests.
   * @param http The HttpClient instance.
   */

  constructor(private http: HttpClient) {
  }

  /**
   * Making the api call for the user registration endpoint
   * @param userDetails The user details for registration.
   * @returns An Observable containing the server's response.
   */

  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users/', userDetails).pipe(
    catchError(this.handleError)
    );
  };

     /**
   * Making the api call for the user login endpoint
   * @param loginDetails The user's login details
   * @returns An Observable containing the server's response
   */
   public userLogin(loginDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login/', loginDetails).pipe(
    catchError(this.handleError)
    )

  };

    /**
   * Making the api call for the get all movies endpoint
   * @returns An Observable containing the list of all movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };


    /**
   * Making the api call for the get one movie endpoint
   * @param movieTitle The title of the movie
   * @returns An Observable containing the movie details
   */
  getOneMovie(movieTitle: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + movieTitle, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

    /**
   * Making the api call for the get director endpoint
   * @param directorName The name of the director
   * @returns An Observable containing the director's information
   */
  getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

   /**
   * Making the api call for the get genre endpoint
   * @param genreName The name of the genre
   * @returns An Observable containing the genre's information
   */
  getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/' + genreName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

    /**
   * Making the api call for the get user endpoint
   * @param userName The username of the user
   * @returns An Observable containing the user's information
   */
  getUser(userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + userName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

    /**
   * Making the api call for the add a movie to favorite movies endpoint
   * @param movie The movie object to be added
   * @param movieID The ID of the movie
   * @param userName The username of the user
   * @returns An Observable containing the server's response
   */
  addFavoriteMovies(movie: any, movieID: any, userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + userName + '/movies/' + movieID, movie, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

   /**
   * Making the api call for the edit user endpoint
   * @param userName The username of the user
   * @param Password The user's password
   * @param Email The user's email
   * @param Birthday The user's birthday
   * @returns An Observable containing the server's response
   */
  editUser(userName: any, Password: any, Email: any,
    Birthday: any
  ): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userName, {Username: userName, Password, Email, Birthday}, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

    /**
   * Making the api call for the delete user endpoint
   * @param userName The username of the user
   * @returns An Observable containing the server's response
   */
  deleteUser(userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userName, {responseType: "text", headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      catchError(this.handleError)
    );
  };

    /**
   * Making the api call for the delete a movie from the favorite movies endpoint
   * @param movieID The ID of the movie
   * @param userName The username of the user
   * @returns An Observable containing the server's response
   */
  deleteMovie(movieID: any, userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userName + '/movies/' + movieID, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

/**
   * Extracts the non-typed response data from the HTTP response
   * @param res The HTTP response
   * @returns The extracted data or an empty object
   */
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  /**
   * Handles HTTP errors
   * @param error The HTTP error response
   * @returns An Observable throwing an error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${JSON.stringify(error)}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}
