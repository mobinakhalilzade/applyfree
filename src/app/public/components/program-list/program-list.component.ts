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
  page: number = 1;

  constructor(private service: PublicService,
    private routeParams: ActivatedRoute,
    private router: Router) {
  }

  getCountries(then = null) {
    this.service.countries().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.countries = body.data;
          if (then != null) {
            then();
          }
        }
      }
    });
  }

  getLength(then = null) {
    this.service.length().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.lengths = body.data;
          if (then != null) {
            then();
          }
        }
      }
    });
  }

  getCategories(then = null) {
    this.service.categories().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.categories = body.data;
          if (then != null) {
            then();
          }
        }
      }
    });
  }

  getPrograms() {
    const params = {
      page: this.page
    }

    this.service.programsByPage(params).subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.programs = body.data;
        }
      }
    });
  }

  ngOnInit() {
    this.getCountries(() => {
      this.getLength(() => {
        this.getCategories();
      });
    });

    this.getPrograms();
  }
}
