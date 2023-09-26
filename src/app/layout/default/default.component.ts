import { AppManagerService } from './../../core/services/app-manager.service';
import { IdentityService } from 'src/app/core/services/identity.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(
    public identity: IdentityService,
    public app: AppManagerService
  ) { }

  ngOnInit(): void {
    this.loadScripts();
  }

  private loadScripts(): void {
    (function($) {
      "use strict";

      $('.reservation').daterangepicker();
      
    })(jQuery);
  }
}