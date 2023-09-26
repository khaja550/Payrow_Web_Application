import { Component, OnInit } from '@angular/core';
// import Swiper from 'swiper';
declare var jQuery: any;
@Component({
  selector: 'app-partners-review',
  templateUrl: './partners-review.component.html',
  styleUrls: ['./partners-review.component.scss'],
})
export class PartnersReviewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.loadJQueryScripts();
  }

  private loadJQueryScripts(): void {
    (($) => {
      'use strict';

      /* Carousel */

      $(document).ready(function() {
        $("#news-slider7").owlCarousel({
          items : 3,
          itemsDesktop : [1199,3],
          itemsDesktopSmall : [1000,2],
          itemsMobile : [650,1],
          pagination :false,
          autoPlay : true
      });
    }); 

    })(jQuery);
  }
}
