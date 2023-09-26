import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.loadJQueryScripts();
  }

  private loadJQueryScripts(): void {
    (($) => {
      'use strict';

      $('.counter').each(function (this: any) {
        var $this = $(this),
          countTo = $this.attr('data-count');

        $({ countNum: $this.text() }).animate(
          {
            countNum: countTo,
          },

          {
            duration: 3000,
            easing: 'linear',
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
              //alert('finished');
            },
          }
        );
      });
    })(jQuery);
  }
}
