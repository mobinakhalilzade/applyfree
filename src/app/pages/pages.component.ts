import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  section: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    router.events.subscribe((val) => {
      this.section = this.route.snapshot.params.section;
    });
  }

  faq = [
    { question: 'Is there any age restriction to use applyfree?', answer: "applyfrees content goes live only after a reviewing process so that the contentitself doesnt harm anybody in general. However, in order to sign a contract you have to be considered legally an adult in your local state or country. ", img: 'assets/images/1.png' },
    { question: 'Im an underage student. How should I use applyfree?', answer: "You can use our search engine and have an account as a student. But to sign a contract, send it to your parent/guardian. They will have to create an account for themselves and sign the contract on behalf of you.", img: 'assets/images/2.png' },
    { question: 'I have an open offering. How should I publish it in applyfrees network?', answer: 'Sign in with your account credentials and find the new contract button in the upper left corner of the dashboards page.', img: 'assets/images/3.png' },
    { question: 'What types of contract offerings wont be accepted?', answer: 'Irrelevant contracts (to education purpose) and Contracts with "not applicable" terms are not accepted.', img: 'assets/images/1.png' },
    { question: 'Can I enter a contract with a user role other than a student?', answer: 'Yes. Any user can enter any contract she/he sees in our platform. However, make sure the contract has something to offer to you before entering the contract.', img: 'assets/images/1.png' },
    { question: 'Im an international student recruiter and have an offering for tutors. Should I publish it on applyfree?', answer: 'Yes you should. Your target audience is limited to all education parties not students only.', img: 'assets/images/1.png' },
    { question: 'Im a GRE tutor. How can I use applyfree for my best interest?', answer: 'First of all you may find a great study abroad offering you cant resist to become an student again. Secondly, you can both find/enter and create/accept contracts with all education parties including students and recruiters.', img: 'assets/images/1.png' },
    { question: 'What is actually free in applyfree?', answer: 'Use of every service in our platform is completely free of any monetary charge for students. Although, before creating a new contract, enterprises should sign a contract with applyfree LLC which includes information about our fees.', img: 'assets/images/1.png' },
    { question: 'What are three types of contracts in applyfree platform?', answer: 'free deals, paid services and affiliate marketing transactions(referral schemes).', img: 'assets/images/1.png' },
  ]

  team = [
    { img: 'assets/images/maher-ashori.jpg', title: 'CTO', name: 'Maher Ashori' },
    { img: 'assets/images/mobina-khalilzade.jpg', title: 'Developer', name: 'Mobina Khalilzade' },
    { img: 'assets/images/vahid-karimi.jpg', title: 'CEO', name: 'Vahid Karimi' },
    { img: 'assets/images/ryan-sharifi.jpg', title: 'COO', name: 'Ryan Sharifi' }
  ]

  ngOnInit(): void {
    this.section = this.route.snapshot.params.section;
  }

}
