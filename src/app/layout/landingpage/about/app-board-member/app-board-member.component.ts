import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-app-board-member',
  templateUrl: './app-board-member.component.html',
  styleUrls: ['./app-board-member.component.scss'],
})
export class AppBoardMemberComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.loadJQueryScripts();
  }

  private loadJQueryScripts(): void {
    (($) => {
      'use strict';

      /* Carousel */

    //   $('#myCarousel').carousel({
    //     interval: 3000,
    //  })

      
    })(jQuery);
  }
}
