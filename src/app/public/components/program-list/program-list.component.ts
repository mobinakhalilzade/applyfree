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

  inputes = {
    category: {
      value: '',
      result:  null
    },
    subCategory: {
      value: '',
      result:  null
    },
    degree: {
      value: '',
      result:  null
    },
    length: {
      value: '',
      result:  null
    },
    country: {
      value: '',
      result: null
    },
    city: {
      value: '',
      result: null
    },
    university: {
      value: '',
      result:  null
    },
    type: {
      value: '',
      result:  null
    }
  }

  //-----------
  loading: boolean = true;
  countries = countries['default'];

  constructor(private service: PublicService,
    private routeParams: ActivatedRoute,
    private router: Router) {
  }

  category = [
    { name: 'Agriculture and Biology', value: 1 },
    { name: 'Applied Sciences and Professions', value: 2 },
    { name: 'Architecture and Building', value: 3 },
    { name: 'Art, Design and Fashion', value: 4 },
    { name: 'Business, Management and Finance', value: 5 },
    { name: 'Computer Science and IT', value: 6 },
    { name: 'Economics, Accounting and Taxation', value: 7 },
    { name: 'Education and Training', value: 1 },
    { name: 'Tourism, Hospitality and Restaurant Business', value: 1 }
  ];

  degree=[
    {id:1 ,name:"bachelor"},
    {id:1 ,name:"PHD"},
    {id:1 ,name:"BBA"}
  ]

  lenght=[
    {id:1 ,name:"more than 4 years"},
    {id:1 ,name:"4 years"},
    {id:1 ,name:"3 years"},
    {id:1 ,name:"2 years"},
    {id:1 ,name:"1 year"},
    {id:1 ,name:"less than 1 year"}
  ] 

  university=[
    {id:1,name:"Harvard"},
    {id:1,name:"Cambridge"},
    {id:1,name:"Oxford"},
    {id:1,name:"MIT"}
  ]

  search() {
    // this.service.contracts({ filter: this.form.filter, type: this.form.type, expire: this.form.expire }).subscribe((resposne: any) => {
    //   if (resposne.status == 200) {
    //     const body = resposne.body;
    //     if (body.return == 200) {
    //       this.results = body.data;
    //       this.loading = false;
    //     }
    //   }
    // });
  }

  reload() {
    //window.location.href = `/contracts?filter=${this.form.filter}&type=${this.form.type}&expire=${this.form.expire}`;
  }

  ngOnInit(): void {
    // const filter = this.routeParams.snapshot.queryParams.filter;

    // if (filter) {
    //   this.form.filter = parseInt(filter);

    //   const findByFilter = this.contracts.find(x => x.id == filter);
    //   if (findByFilter) {
    //     this.form.in = findByFilter.name;
    //   }
    // }

    // const type = this.routeParams.snapshot.queryParams.type;

    // if (type) {
    //   this.form.type = parseInt(type);
    // }

    // const expire = this.routeParams.snapshot.queryParams.expire;

    // if (expire) {
    //   this.form.expire = parseInt(expire);
    // }
    // this.search();
  }
}
