import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-merchant-location',
  templateUrl: './merchant-location.component.html',
  styleUrls: ['./merchant-location.component.scss']
})
export class MerchantLocationComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        this.loadjQueryScripts();
    }

    private loadjQueryScripts(): void {
        (function ($) {
        "use strict";
        $('.knob').knob();

        $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
        $('#side_menu_bar > ul > li.nav-item > a#li_distributor').addClass("active");
        })(jQuery);
    }
}
