import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  menus: menu[] = [
    {
      title: "Damage Calculator",
      summary: "This times that plus those and then...",
      description: "Eh too complicated!\nWhat if I just put my stats and let someone calculate the rest?\nWell now you can!",
      url: "dmg-calc/",
      background: "assets/background/compare.jpg",
    },
    {
      title: "EHR Calculator",
      summary: "Why are they always resisting my debuff?",
      description: "Figure out how many EHR is needed to always guarantee your debuff or DoT!\nOr find out what's the % chance to apply said effect within a certain condition!",
      url: "effect-hit-rate/",
      background: "assets/background/compare.jpg",
    },
  ];
  constructor(
    private nav: NavController
  ) { }

  ngOnInit() {
  }

  async goTo(url:any){
    await this.nav.navigateRoot(url);
  }
}

interface menu {
  title: string;
  background?: string;
  summary?: string;
  description?: string;
  url?: string;
}