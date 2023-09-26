import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-payrow-partners',
  templateUrl: './payrow-partners.component.html',
  styleUrls: ['./payrow-partners.component.scss']
})
export class PayrowPartnersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadJQueryScripts();
  }

  private loadJQueryScripts(): void {
    (($) => {
      'use strict';

      /* Client */


    })(jQuery);
  }

}
