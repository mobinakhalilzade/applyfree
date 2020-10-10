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
  contracts = [
    { id: 1, title: 'students', description: 'I want to find student contract' },
    { id: 2, title: 'schools', description: 'I want to find Schools contract' },
    { id: 3, title: 'translators', description: 'I want to find Translators contract' },
    { id: 4, title: 'tutors', description: 'I want to find Tutors contract' },
    { id: 5, title: 'recruiters', description: 'I want to find Recruiters contract' },
    { id: 6, title: 'parents', description: 'I want to find Parents contract' }
  ];

  programmes = [
    { title: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { title: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { title: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { title: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { title: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { title: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { title: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { title: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { title: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { title: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { title: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { title: 'programme', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' }
  ];

  category = [
    { title: 'Agriculture and Biology', value: 1 },
    { title: 'Applied Sciences and Professions', value: 2 },
    { title: 'Architecture and Building', value: 3 },
    { title: 'Art, Design and Fashion', value: 4 },
    { title: 'Business, Management and Finance', value: 5 },
    { title: 'Computer Science and IT', value: 6 },
    { title: 'Economics, Accounting and Taxation', value: 7 },
    { title: 'Education and Training', value: 1 },
    { title: 'Engineering and Technology', value: 1 },
    { title: 'Environmental Studies and Earth Sciences', value: 1 },
    { title: 'Food Nutrition and Beverage Studies', value: 1 },
    { title: 'Journalism and Media', value: 1 },
    { title: 'Law and Jurisprudence', value: 1 },
    { title: 'Leisure and Sports', value: 1 },
    { title: 'Logistics and Transportation', value: 1 },
    { title: 'Marketing, Media and Communication', value: 1 },
    { title: 'Mathematics, Physics and Chemistry', value: 1 },
    { title: 'Medicine and Health', value: 1 },
    { title: 'Military Science and Security', value: 1 },
    { title: 'Philology and Culturology', value: 1 },
    { title: 'Psychology', value: 1 },
    { title: 'Sociology, Political Science and History', value: 1 },
    { title: 'Tourism, Hospitality and Restaurant Business', value: 1 }
  ];

  degree=[
    {id:1 ,title:"bachelor"},
    {id:1 ,title:"PHD"},
    {id:1 ,title:"BBA"}
  ]

  lenght=[
    {id:1 ,title:"more than 4 years"},
    {id:1 ,title:"4 years"},
    {id:1 ,title:"3 years"},
    {id:1 ,title:"2 years"},
    {id:1 ,title:"1 year"},
    {id:1 ,title:"less than 1 year"}
  ] 

  intakes=[
    {id:1 ,title:"This Term"},
    {id:1 ,title:"Next Term"}
  ]

  universities=[
    {id:1,title:"Harvard"},
    {id:1,title:"Cambridge"},
    {id:1,title:"Oxford"},
    {id:1,title:"MIT"}
  ]

  constructor(private service: PublicService,
    private routeParams: ActivatedRoute,
    private router: Router) {
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
