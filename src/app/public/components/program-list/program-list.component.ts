import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../public.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})

export class ProgramListComponent implements OnInit {

  inputes = {
    category: {
      value: '',
      result: null
    },
    subCategory: {
      value: '',
      result: null
    },
    degree: {
      value: '',
      result: null
    },
    length: {
      value: '',
      result: null
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
      result: null
    },
    type: {
      value: '',
      result: null
    }
  }

  //-----------
  loading: boolean = true;
  countries: any;
  length: any;
  categories: any;

  constructor(private service: PublicService,
    private routeParams: ActivatedRoute,
    private router: Router) {
  }

  program = [
    { name: 'program', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'program', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'program', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'program', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'program', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'program', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'program', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'program', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'program', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'program', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'program', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' },
    { name: 'program', image: 'assets/images/Harvard-University.jpg', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point' }
  ];

  degree = [
    { id: 1, name: "bachelor" },
    { id: 1, name: "PHD" },
    { id: 1, name: "BBA" }
  ]

  university = [
    { id: 1, name: "Harvard" },
    { id: 1, name: "Cambridge" },
    { id: 1, name: "Oxford" },
    { id: 1, name: "MIT" }
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

    this.service.countries().subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.countries = body.data;
        }
      }
    })

    this.service.length().subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.length = body.data;
          console.log(this.length);
        }
      }
    })

    this.service.categories().subscribe((response:any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.categories = body.data;
        }
      }
    })

    // this.service.programs().subscribe((response) => {
    //   console.log(response);
    // })

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
