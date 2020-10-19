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
  lengths: any;
  categories: any;
  programs: any;
  pager: any = {};
  pagedItems: any[];

  constructor(private service: PublicService,
    private routeParams: ActivatedRoute,
    private router: Router) {
  }

  getCountries() {
    this.service.countries().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.countries = body.data;
        }
      }
    });
  }

  getLength() {
    this.service.length().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.lengths = body.data;
        }
      }
    });
  }

  getCategories() {
    this.service.categories().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.categories = body.data;
        }
      }
    });
  }

  getPrograms() {
    this.service.programs().subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.programs = body.data;
        }
      }
    });
  }

  setPage(page: number) {

    if (page < 1 || page > this.programs.pages) {
      return;
    }

   
  }


  ngOnInit(): void {

    this.getCountries();
    this.getLength();
    this.getCategories();
    this.getPrograms();

    const params = {
      page: 1
    }

    this.service.programss(params).subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.programs = body.data;
        }
      }
    })

  }
}
