import { Component } from '@angular/core';
import { BaMenuService } from '../../theme';



@Component({
  selector: 'gwdashboard',
  templateUrl: './gwdashboard.component.html'
})
export class GwdashboardComponent {

  constructor(private _menuService: BaMenuService) {
  }

  ngOnInit() {

  }
}
