import { Component } from '@angular/core';
import { FacadeService } from 'src/app/facade/facade.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private facadeService: FacadeService){}
  


}
