import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StarWarsService } from 'src/app/services/starWars/star-wars.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {

  searchForm: FormGroup;

  displayedColumns: string[] = ['No.', 'name', 'population', 'terrain', 'diameter', 'films'];
  dataSource;

  currPage = 1;
  maxPages = 10;
  qtdPerPage = 10;

  hasNext: boolean = false;
  hasPrevious: boolean = true;

  @Output() goToFilmEvent = new EventEmitter<any>();

  constructor(private starWarsService: StarWarsService) { }

  ngOnInit(): void {
    this.getPlanets();
  }

  getPlanets(page?) {
    this.starWarsService.getPlanets(page).subscribe(planets => {
      this.currPage = (page) ? page : 1;
      this.maxPages = Math.ceil(planets["count"] / this.qtdPerPage)

      this.hasNext = (planets["next"] !== null) ? true : false;
      this.hasPrevious = (planets["previous"] !== null) ? true : false;

      let data = [];

      planets["results"].forEach(element => {
        data.push(element)
      });

      this.dataSource = data
    })
  }

  goToFilms(urls, name) {
    this.goToFilmEvent.emit({ urls: urls, name: name })
  }

  nextPage() {
    this.dataSource = null;
    this.getPlanets(this.currPage + 1);
  }

  previousPage() {
    this.dataSource = null;
    this.getPlanets(this.currPage - 1);
  }

  search(value) {
    console.log(value)

    this.starWarsService.search(value).subscribe(planets => {
      console.log(planets)

      this.currPage = (planets["count"] > 0) ? 1 : 0;
      this.maxPages = Math.ceil(planets["count"] / this.qtdPerPage)

      this.hasNext = (planets["next"] !== null) ? true : false;
      this.hasPrevious = (planets["previous"] !== null) ? true : false;

      let data = [];

      planets["results"].forEach(element => {
        data.push(element)
      });

      this.dataSource = data

    })
  }

}
