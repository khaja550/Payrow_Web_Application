import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-scroll-bg',
  templateUrl: './scroll-bg.component.html',
  styleUrls: ['./scroll-bg.component.scss'],
})
export class ScrollBgComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.loadJQueryScripts();
  }

  private loadJQueryScripts(): void {
    (($) => {
      'use strict';


    })(jQuery);
  }
}
