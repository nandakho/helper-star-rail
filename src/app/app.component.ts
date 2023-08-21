import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appTitle: string = "Helper Star Rail";
  gitLink: string = "https://github.com/nandakho/helper-star-rail";
  public appPages = [
    { title: 'Damage Calculator', url: 'dmg-calc', icon: 'calculator' },
  ];
  constructor() {}
}
