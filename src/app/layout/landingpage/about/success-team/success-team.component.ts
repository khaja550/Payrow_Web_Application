import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-success-team',
  templateUrl: './success-team.component.html',
  styleUrls: ['./success-team.component.scss']
})
export class SuccessTeamComponent implements OnInit {

  constructor() { }

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
