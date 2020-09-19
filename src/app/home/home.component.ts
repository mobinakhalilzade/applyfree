import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  roles = [
    { image: 'assets/images/student.png', id: 1, active: false, name: 'Student', title: 'Im student', description: 'some thing like lorem ipsum' },
    { image: 'assets/images/tutor.png', id: 2, active: false, name: 'Tutor', title: 'Im tutor', description: 'some thing like lorem ipsum' },
    { image: 'assets/images/recruiter.png', id: 3, active: false, name: 'Recruiter', title: 'Im recruiter', description: 'some thing like lorem ipsum' },
    { image: 'assets/images/translator.png', id: 4, active: false, name: 'Translator', title: 'Im translator', description: 'some thing like lorem ipsum' },
    { image: 'assets/images/school.png', id: 5, active: false, name: 'School', title: 'Im school', description: 'some thing like lorem ipsum' },
    { image: 'assets/images/other.png', id: 6, active: false, name: 'Other', title: 'Im other', description: 'some thing like lorem ipsum' }
  ]

  ngOnInit(): void {
  }

}
