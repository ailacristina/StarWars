import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StarWarsService } from 'src/app/services/starWars/star-wars.service';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  @Input() urlFilms;
  @Input() planet;

  @Output() returnToPlanetsEmitter = new EventEmitter<any>();

  dataSource;

  constructor(private router: Router, private starWarsService: StarWarsService) { }

  ngOnInit(): void {
    let dataFilms = [];

    if(this.urlFilms.length === 0) this.dataSource = []

    this.urlFilms.forEach((urlFilm, index) => {
      this.starWarsService.getFilms(urlFilm).subscribe(films => {
        dataFilms.push(films)

        if (index >= this.urlFilms.length - 1) {
          this.dataSource = dataFilms;
        }
      })
    });
  }

  returnToPlanets() {
    this.returnToPlanetsEmitter.emit();
  }
}
