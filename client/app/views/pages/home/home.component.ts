import { Component } from '@angular/core';
import { AppConfigService } from 'app/views/app-config.service';
@Component({
  selector: 'views-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public appConfig: AppConfigService) {}
}
