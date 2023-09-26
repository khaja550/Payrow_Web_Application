import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export class AppMenuComponent implements OnInit {
  public show: boolean = false;
  public buttonName: any = true;
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
