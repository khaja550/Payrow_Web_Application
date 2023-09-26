import { Component, OnInit } from '@angular/core';

declare const myTest: any;
declare const swiper: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    swiper();
  }

  // onClick() {
  //   myTest();
  // }



}

