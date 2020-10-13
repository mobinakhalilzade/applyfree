import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../public.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as countries from 'src/assets/countries.json';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})

export class ProgramListComponent implements OnInit {
  form: any = { in: 'students', filter: 1, type: 1, expire: 30 };
  results: any = [];
  loading: boolean = true;
  alert: any;
  countries = countries['default'];
  cities: Array<string> = [];

  countrySearch: string;
  citySearch: string;
  categorySearch: string;
  subCategorySearch: string;
  universitySearch: string;
  degreeSearch: string;

  contracts = [
    { id: 1, title: 'students', description: 'I want to find student contract' },
    { id: 2, title: 'schools', description: 'I want to find Schools contract' },
    { id: 3, title: 'translators', description: 'I want to find Translators contract' },
    { id: 4, title: 'tutors', description: 'I want to find Tutors contract' },
    { id: 5, title: 'recruiters', description: 'I want to find Recruiters contract' },
    { id: 6, title: 'parents', description: 'I want to find Parents contract' }
  ];

  programmes = [
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' }
  ];

  category = [
    { name: 'Agriculture and Biology', value: 1 },
    { name: 'Applied Sciences and Professions', value: 2 },
    { name: 'Architecture and Building', value: 3 },
    { name: 'Art, Design and Fashion', value: 4 },
    { name: 'Business, Management and Finance', value: 5 },
    { name: 'Computer Science and IT', value: 6 },
    { name: 'Economics, Accounting and Taxation', value: 7 },
    { name: 'Education and Training', value: 1 },
    { name: 'Engineering and Technology', value: 1 },
    { name: 'Environmental Studies and Earth Sciences', value: 1 },
    { name: 'Food Nutrition and Beverage Studies', value: 1 },
    { name: 'Journalism and Media', value: 1 },
    { name: 'Law and Jurisprudence', value: 1 },
    { name: 'Leisure and Sports', value: 1 },
    { name: 'Logistics and Transportation', value: 1 },
    { name: 'Marketing, Media and Communication', value: 1 },
    { name: 'Mathematics, Physics and Chemistry', value: 1 },
    { name: 'Medicine and Health', value: 1 },
    { name: 'Military Science and Security', value: 1 },
    { name: 'Philology and Culturology', value: 1 },
    { name: 'Psychology', value: 1 },
    { name: 'Sociology, Political Science and History', value: 1 },
    { name: 'Tourism, Hospitality and Restaurant Business', value: 1 }
  ];

  degree = [
    { id: 1, name: "bachelor" },
    { id: 1, name: "PHD" },
    { id: 1, name: "BBA" }
  ]

  lenght = [
    { id: 1, name: "more than 4 years" },
    { id: 1, name: "4 years" },
    { id: 1, name: "3 years" },
    { id: 1, name: "2 years" },
    { id: 1, name: "1 year" },
    { id: 1, name: "less than 1 year" }
  ]

  intakes = [
    { id: 1, name: "This Term" },
    { id: 1, name: "Next Term" }
  ]

  universities = [
    { id: 1, name: "Harvard" },
    { id: 1, name: "Cambridge" },
    { id: 1, name: "Oxford" },
    { id: 1, name: "MIT" }
  ]

  constructor(private service: PublicService,
    private routeParams: ActivatedRoute,
    private router: Router) {
  }

  findStates(item: any) {
    let selectedCountry = this.countries.find(country => country.name == item);
    this.cities = selectedCountry.states;
  }

  search() {
    this.service.contracts({ filter: this.form.filter, type: this.form.type, expire: this.form.expire }).subscribe((resposne: any) => {
      if (resposne.status == 200) {
        const body = resposne.body;
        if (body.return == 200) {
          this.results = body.data;
          this.loading = false;
        }
      }
    });
  }

  notify() {
    const search = window.location.search.split("?");
    this.service.notify({ url: search[1] }).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        this.alert = body;
      }
    });
  }

  reload() {
    window.location.href = `/contracts?filter=${this.form.filter}&type=${this.form.type}&expire=${this.form.expire}`;
  }

  ngOnInit(): void {
    const filter = this.routeParams.snapshot.queryParams.filter;

    if (filter) {
      this.form.filter = parseInt(filter);

      const findByFilter = this.contracts.find(x => x.id == filter);
      if (findByFilter) {
        this.form.in = findByFilter.title;
      }
    }

    const type = this.routeParams.snapshot.queryParams.type;

    if (type) {
      this.form.type = parseInt(type);
    }

    const expire = this.routeParams.snapshot.queryParams.expire;

    if (expire) {
      this.form.expire = parseInt(expire);
    }
    this.search();
  }
}
