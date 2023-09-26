import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-specification-wizard',
  templateUrl: './specification-wizard.component.html',
  styleUrls: ['./specification-wizard.component.scss'],
})
export class SpecificationWizardComponent implements OnInit {
  activeIndex: any;
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
