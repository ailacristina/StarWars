import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  private apiStarWars = environment.apiStarWars;

  constructor(private httpClient: HttpClient) { }

  public getPlanets(page?: string) {
    let p = (page) ? "?page="+page : "";
    return this.httpClient.get(this.apiStarWars + "planets/" + p, httpOptions)
  }

  public getFilms(url) {
    return this.httpClient.get<any>(url, httpOptions);
  }

  public search(value){
    return this.httpClient.get<any>(this.apiStarWars + "planets/?search="+value, httpOptions)
  }
}
