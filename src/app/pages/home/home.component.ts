import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage implements OnInit {

  urlFilms;
  planet;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
  }

  goToFilm(urlFilms, planet) {
    this.urlFilms = urlFilms;
    this.planet = planet
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(["/login"]);
  }

  returnToPlanetsEmitter(){
    this.urlFilms = null;
    this.planet = null;
  }

}
