import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../public.service';
import { ActivatedRoute, Router } from '@angular/router';
import { urls } from "../../../config/urls";
declare var $: any;
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
    },
    tuition: {
      min: 0,
      max: 0
    },
    costInYear: {
      min: 0,
      max: 0
    }
  }

  //-----------
  url: typeof urls = urls;
  loading: boolean = true;
  countries: any;
  categories: any;
  schools: any;
  schoolsType: any;
  programs: any;
  maxDate = new Date().toISOString().split("T")[0];

  queryParams = this.route.snapshot.queryParams;
  currentPage: any;
  filterModel = {
    active: false,
    total: 0,
    pageSize: 12,
    pageIndex: this.queryParams.page == undefined ? 1 : this.queryParams.page,
    free: this.queryParams.free == undefined ? null : JSON.parse(this.queryParams.free),
    opt: this.queryParams.opt == undefined ? null : JSON.parse(this.queryParams.opt),
    tuition: this.queryParams.tuition == undefined ? null : this.queryParams.tuition,
    living: this.queryParams.living == undefined ? null : this.queryParams.living,
    search: this.queryParams.search == undefined || this.queryParams.search == "" ? null : this.queryParams.search,
    onSearch: this.queryParams.search == undefined || this.queryParams.search == "" ? null : this.queryParams.search,
    submission: this.queryParams.submission == undefined || this.queryParams.submission == "" ? null : this.queryParams.submission,
    sort: this.queryParams.sort == undefined ? null : this.queryParams.sort,
    direction: this.queryParams.direction == undefined ? null : this.queryParams.direction
  }

  constructor(private service: PublicService,
    private route: ActivatedRoute,
    private router: Router) {
    route.queryParams.subscribe((response: any) => {
      this.currentPage = response.page
    })
  }

  getCountries(then = null) {
    this.service.countries().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.countries = body.data;
          if (this.queryParams.country != undefined) {
            const findCountry = this.countries.find(x => x.name == this.queryParams.country);
            if (findCountry) {
              this.inputes.country.result = findCountry;

              if (this.queryParams.city != undefined) {
                const findCity = findCountry.cities.find(x => x == this.queryParams.city);
                this.inputes.city.result = findCity;
              }
            }
          }
          if (then != null) {
            then();
          }
        }
      }
    });
  }

  getTuition(then = null) {
    this.service.tuition().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.inputes.tuition.min = data.min;
          this.inputes.tuition.max = data.max;
          if (then != null) {
            then();
          }
        }
      }
    });
  }

  getCostInYear(then = null) {
    this.service.costInYear().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.inputes.costInYear.min = data.min;
          this.inputes.costInYear.max = data.max;
          if (then != null) {
            then();
          }
        }
      }
    });
  }

  getSchools(then = null) {
    this.service.schools().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.schools = data;
          this.inputes.university.result = this.queryParams.school == undefined ? null : this.queryParams.school;
          if (then != null) {
            then();
          }
        }
      }
    });
  }

  getSchoolsType(then = null) {
    this.service.schoolsType().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.schoolsType = data;
          this.inputes.type.result = this.queryParams.type == undefined ? null : this.queryParams.type;
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
          this.inputes.category.result = this.queryParams.category == undefined ? this.categories[0]['name'] : this.queryParams.category;
          this.inputes.degree.result = this.queryParams.degree == undefined ? null : this.queryParams.degree;
          if (then != null) {
            then();
          }
        }
      }
    });
  }

  getPrograms(filter: any) {
    let params = {
      page: filter.pageIndex
    };

    if (filter.search != null && filter.search != "") {
      params['search'] = filter.search;
    } else {
      params['category'] = this.inputes.category.result;

      if (filter.submission != null && filter.submission != "") {
        params['submission'] = filter.submission;
      }

      if (filter.free != null) {
        params['free'] = filter.free;
      }

      if (filter.opt != null) {
        params['opt'] = filter.opt;
      }

      if (this.inputes.degree.result != null) {
        params['degree'] = this.inputes.degree.result;
      }

      if (this.inputes.city.result != null) {
        params['city'] = this.inputes.city.result;
      }

      if (this.inputes.country.result != null) {
        params['country'] = this.inputes.country.result.name;
      }

      if (this.inputes.type.result != null) {
        params['type'] = this.inputes.type.result;
      }

      if (this.inputes.university.result != null) {
        params['school'] = this.inputes.university.result;
      }

      if (filter.tuition != null) {
        params['tuition'] = filter.tuition;
      }

      if (filter.living != null) {
        params['living'] = filter.living;
      }

      if (filter.sort != null) {
        params['sort'] = filter.sort;
        params['direction'] = filter.direction;
      }
    }

    this.service.programs(params).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.programs = body.data;
          setTimeout(() => {
            this.filterModel.pageIndex = filter.pageIndex;
            this.filterModel.total = body.total;
            this.filterModel.active = true;
            this.loading = false;
            this.progress['loading'] = 12.5 * 8;

          }, 1000);
        }
      }
    });
  }

  pageChange(filter: any) {
    setTimeout(() => {
      if (filter.pageIndex != this.currentPage) {
        this.loading = true;
        this.filterModel.active = false;
        let queryParams = {
          page: filter.pageIndex,
        };

        if (filter.search != null && filter.search != "") {
          queryParams['search'] = filter.search;
        } else {
          queryParams['category'] = this.inputes.category.result;

          if (filter.submission != null && filter.submission != "") {
            queryParams['submission'] = filter.submission;
          }

          if (filter.free != null) {
            queryParams['free'] = filter.free;
          }

          if (filter.opt != null) {
            queryParams['opt'] = filter.opt;
          }

          if (this.inputes.degree.result != null) {
            queryParams['degree'] = this.inputes.degree.result;
          }

          if (this.inputes.city.result != null) {
            queryParams['city'] = this.inputes.city.result;
          }

          if (this.inputes.country.result != null) {
            queryParams['country'] = this.inputes.country.result.name;
          }

          if (this.inputes.type.result != null) {
            queryParams['type'] = this.inputes.type.result;
          }

          if (this.inputes.university.result != null) {
            queryParams['school'] = this.inputes.university.result;
          }

          if (filter.tuition != null) {
            queryParams['tuition'] = filter.tuition;
          }

          if (filter.living != null) {
            queryParams['living'] = filter.living;
          }

          if (filter.sort != null) {
            queryParams['sort'] = filter.sort;
            queryParams['direction'] = filter.direction;
          }
        }

        this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, queryParamsHandling: 'merge' });
        this.getPrograms(filter);
      }
    }, 50);
  }

  filter() {
    this.loading = true;
    let queryParams = {
      page: 1
    };

    if (this.filterModel.search != null && this.filterModel.search != "") {
      //-----set null
      this.inputes.degree.result = null;
      this.inputes.university.result = null;
      this.inputes.country.result = null;
      this.inputes.city.result = null;
      this.inputes.type.result = null;
      this.filterModel.tuition = null;
      this.filterModel.living = null;
      this.filterModel.opt = null;
      this.filterModel.free = null;
      this.filterModel.submission = null;
      //-----
      queryParams['search'] = this.filterModel.search;
      this.filterModel.onSearch = this.filterModel.search;
    } else {
      //-----set null
      this.filterModel.onSearch = null;
      this.filterModel.search = null;
      //-----
      if (this.inputes.category.result != null) {
        queryParams['category'] = this.inputes.category.result;
      }

      if (this.filterModel.submission != null && this.filterModel.submission != "") {
        queryParams['submission'] = this.filterModel.submission;
      }

      if (this.filterModel.free != null) {
        queryParams['free'] = this.filterModel.free;
      }

      if (this.filterModel.opt != null) {
        queryParams['opt'] = this.filterModel.opt;
      }

      if (this.inputes.degree.result != null) {
        queryParams['degree'] = this.inputes.degree.result;
      }

      if (this.inputes.country.result != null) {
        queryParams['country'] = this.inputes.country.result.name;
      }

      if (this.inputes.city.result != null) {
        queryParams['city'] = this.inputes.city.result;
      }

      if (this.inputes.type.result != null) {
        queryParams['type'] = this.inputes.type.result;
      }

      if (this.inputes.university.result != null) {
        queryParams['school'] = this.inputes.university.result;
      }

      if (this.filterModel.tuition != null) {
        queryParams['tuition'] = this.filterModel.tuition;
      }

      if (this.filterModel.living != null) {
        queryParams['living'] = this.filterModel.living;
      }

      if (this.filterModel.sort != null) {
        queryParams['sort'] = this.filterModel.sort;
        queryParams['direction'] = this.filterModel.direction;
      }
    }

    this.router.navigate(['.'], {
      relativeTo: this.route, queryParams: queryParams
    });

    this.filterModel.pageIndex = queryParams.page;
    this.getPrograms(this.filterModel);
    $('#advanceFilters').modal('hide');
    $('#categories').modal('hide');
  }

  progress = {
    description: 'loading...',
    loading: 0
  };
  ngOnInit() {
    this.progress = {
      description: 'loading countries...',
      loading: 12.5
    };
    this.progress['loading'] = 12.5;
    this.getCountries(() => {
      this.progress = {
        description: 'loading categories...',
        loading: 12.5 * 2
      };
      this.getCategories(() => {
        this.progress = {
          description: 'loading schools...',
          loading: 12.5 * 3
        };
        this.getSchools(() => {
          this.progress['loading'] = 12.5 * 4;
          this.getSchoolsType(() => {
            this.progress['loading'] = 12.5 * 5;
            this.getTuition(() => {
              this.progress['loading'] = 12.5 * 6;
              this.getCostInYear(() => {
                this.progress = {
                  description: 'loading programs...',
                  loading: 12.5 * 7
                };
                this.getPrograms(this.filterModel);
              });
            });
          });
        });
      });
    });
  }
}
