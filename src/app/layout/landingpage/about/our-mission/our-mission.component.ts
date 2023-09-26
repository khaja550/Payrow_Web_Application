import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-our-mission',
  templateUrl: './our-mission.component.html',
  styleUrls: ['./our-mission.component.scss']
})
export class OurMissionComponent implements OnInit {

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
