import { Component, OnInit, TransferState, makeStateKey, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { Title, Meta } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-dmg-calc',
  templateUrl: './dmg-calc.page.html',
  styleUrls: ['./dmg-calc.page.scss'],
})
export class DmgCalcPage implements OnInit {
  apiUrl: string = `http://localhost:8008/hsr/dmg`;
  url: string|null = '';
  myStats: stats = {
    attack: 0,
    skillMultiplier: 0,
    elementDmg: 0,
    dmgBoost: 0,
    charLvl: 0,
    enemiesLvl: 0,
    defReduc: 0,
    defIgnore: 0,
    isEnemiesWeak: false,
    dmgTakenDebuff: 0,
    isEnemiesBreakState: false,
    critDmg: 0,
    resPen: 0
  };
  dmgResult: result = {
    estdDmgOutput: 0,
    estdCritDmgOutput: 0
  };
  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId:any,
    private trf: TransferState
  ) {
    this.serverSide();
  }
  
  ngOnInit() { }

  async serverSide(){
    this.url = this.route.snapshot.paramMap.get('attr');
    if(this.url){
      const attr = this.url.split("_");
      if(attr.length==13){
        this.myStats = {
          attack: parseFloat(attr[0]),
          skillMultiplier: parseFloat(attr[1]),
          elementDmg: parseFloat(attr[2]),
          dmgBoost: parseFloat(attr[3]),
          charLvl: parseInt(attr[4]),
          enemiesLvl: parseInt(attr[5]),
          defReduc: parseFloat(attr[6]),
          defIgnore: parseFloat(attr[7]),
          isEnemiesWeak: parseInt(attr[8])==1,
          dmgTakenDebuff: parseFloat(attr[9]),
          isEnemiesBreakState: parseInt(attr[10])==1,
          critDmg: parseFloat(attr[11]),
          resPen: parseFloat(attr[12])
        }
        const DATA_KEY = makeStateKey(this.url);
        if (this.trf.hasKey(DATA_KEY)) {
          console.log('Fetch from State!');
          const saved = this.trf.get(DATA_KEY, null);
          console.log(saved);
          this.dmgResult = {
            estdDmgOutput: saved?saved['estdDmgOutput']:0,
            estdCritDmgOutput: saved?saved['estdCritDmgOutput']:0
          }
          this.trf.remove(DATA_KEY);
        } else {
          console.log('Get Data from API...');
          const calculated = await this.calculate();
          console.log(calculated);
          if (isPlatformServer(this.platformId)) {
            console.log("Is Server");
            this.setTag();
            this.trf.set<any>(DATA_KEY, calculated);
          } else {
            console.log("Is Client");
            this.dmgResult = calculated;
          }
        }
      }
    }
  }

  setTag(){
    this.title.setTitle('Helper Star Rail - Damage Calculator');
    this.meta.updateTag({ name: 'description', content: 'Honkai Star Rail Damage Calculator' });
    this.meta.updateTag({ property: 'og:url', content: `/dmg-calc${this.url?'/'+this.url:''}` });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:description', content: `Honkai Star Rail Damage Calculator${this.url?'\nYour damage is: '+this.dmgResult.estdDmgOutput:''}` });
    this.meta.updateTag({ property: 'og:title', content: 'Helper Star Rail - Damage Calculator' });
    this.meta.updateTag({ property: 'og:image', content: 'https://hsr.nandakho.my.id/assets/icon/icon.png' });
  }

  async navCalc():Promise<void> {
    const url = `/dmg-calc/${this.myStats.attack?this.myStats.attack:0}_${this.myStats.skillMultiplier?this.myStats.skillMultiplier:0}_${this.myStats.elementDmg?this.myStats.elementDmg:0}_${this.myStats.dmgBoost?this.myStats.dmgBoost:0}_${this.myStats.charLvl?this.myStats.charLvl:0}_${this.myStats.enemiesLvl?this.myStats.enemiesLvl:0}_${this.myStats.defReduc?this.myStats.defReduc:0}_${this.myStats.defIgnore?this.myStats.defIgnore:0}_${this.myStats.isEnemiesWeak?1:0}_${this.myStats.dmgTakenDebuff?this.myStats.dmgTakenDebuff:0}_${this.myStats.isEnemiesBreakState?1:0}_${this.myStats.critDmg?this.myStats.critDmg:0}_${this.myStats.resPen?this.myStats.resPen:0}`;
    await this.nav.navigateRoot(url);
  }

  async calculate(): Promise<result>{
    const data = JSON.stringify(this.myStats);
    const options:HttpOptions = {
      method: "POST",
      url: this.apiUrl,
      headers: { "Content-Type": "application/json" },
      data: data
    };
    const response: HttpResponse = await CapacitorHttp.request(options);
    console.log(response);
    if(response.data){
      return Promise.resolve({estdDmgOutput:response.data.estdDmgOutput?response.data.estdDmgOutput:0, estdCritDmgOutput:response.data.estdCritDmgOutput?response.data.estdCritDmgOutput:0})
    }
    return Promise.resolve({estdDmgOutput:0, estdCritDmgOutput:0});
  }
}

interface stats {
  attack: number,
  skillMultiplier: number,
  elementDmg: number,
  dmgBoost: number,
  charLvl: number,
  enemiesLvl: number,
  defReduc: number,
  defIgnore: number,
  isEnemiesWeak: boolean,
  dmgTakenDebuff: number,
  isEnemiesBreakState: boolean,
  critDmg: number,
  resPen: number
}

interface result {
  estdCritDmgOutput: number,
  estdDmgOutput: number
}