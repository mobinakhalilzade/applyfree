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
    country: {
      value: '',
      result: null
    },
    city: {
      value: '',
      result: null
    }
  }
  
  //-----------
  loading: boolean = true;
  countries = countries['default'];

  constructor(private service: PublicService,
    private routeParams: ActivatedRoute,
    private router: Router) {
  }

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
    //     this.form.in = findByFilter.title;
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
