import { Component, OnInit, TransferState, makeStateKey, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-effect-hit-rate',
  templateUrl: './effect-hit-rate.page.html',
  styleUrls: ['./effect-hit-rate.page.scss'],
})
export class EffectHitRatePage implements OnInit {
  apiUrl: string = `http://localhost:8008/hsr`;
  whatType: apiAddr[] = [
    {name:`Chance`,address:`${this.apiUrl}/realchance`},
    {name:`Hit Rate`,address:`${this.apiUrl}/ehr`}
  ];
  typeSelected: number = 0;
  url: string|null = '';
  myStats: ehrStats = {
    baseChance: 0,
    enemiesResist: 0,
    resistReduc: 0,
    ehr: 0,
  };
  result: result = {
    realChance: 0,
    ehrNeeded: 0
  };
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId:any,
    private trf: TransferState
  ) {
    this.serverSide();
  }
  
  ngOnInit() { }

  serverSide(){
    this.url = this.route.snapshot.paramMap.get('attr');
    if(this.url){
      const attr = this.url.split("_");
      this.typeSelected = parseInt(attr[0])==1?1:0;
      if(attr.length==5){
        this.myStats = {
          baseChance: parseFloat(attr[1]),
          enemiesResist: parseFloat(attr[2]),
          resistReduc: parseFloat(attr[3]),
          ehr: parseFloat(attr[4]),
        }
        const DATA_KEY = makeStateKey(this.url);
        if (this.trf.hasKey(DATA_KEY)) {
          const saved = this.trf.get(DATA_KEY, null);
          this.result = {
            realChance: saved?parseFloat(saved['realChance']):0,
            ehrNeeded: saved?parseFloat(saved['ehrNeeded']):0
          }
          this.trf.remove(DATA_KEY);
        } else {
          const data = JSON.stringify(this.myStats);
          if(isPlatformServer(this.platformId)){
            this.http.post<result>(this.whatType[this.typeSelected].address,data,{headers:{ "Content-Type": "application/json" }}).subscribe(calculated=>{
              const calc = {
                realChance: calculated?.realChance??0,
                ehrNeeded: calculated?.ehrNeeded??0
              }
              this.result = calc;
              this.setTag();
              this.trf.set<any>(DATA_KEY, calc);
            });
          } else {
            this.result = {
              realChance: 0,
              ehrNeeded: 0
            }
          }
        }
      }
    }
  }

  setTag(){
    var desc = ``;
    if(this.typeSelected = 0){
      desc += `What is your chance to apply effect on enemies?${this.url?`\n
        Base Chance: ${this.myStats.baseChance}%\n
        Enemy's Resist: ${this.myStats.enemiesResist}%\n
        Resist Reduction: ${this.myStats.resistReduc}%\n
        EHR: ${this.myStats.ehr}%\n
        Effect Chance: ${this.result.realChance}%`:''}
      `;
    } else {
      desc += `How many EHR stat is needed to guarantee effect appliance on enemies?${this.url?`\n
        Base Chance: ${this.myStats.baseChance}%\n
        Enemy's Resist: ${this.myStats.enemiesResist}%\n
        Resist Reduction: ${this.myStats.resistReduc}%\n
        EHR Needed: ${this.result.ehrNeeded}%`:''}
      `;
    }
    this.title.setTitle(`Helper Star Rail - Effect ${this.whatType[this.typeSelected].name}`);
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:url', content: `/effect-hit-rate${this.url?'/'+this.url:''}` });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:title', content: `Helper Star Rail - Effect ${this.whatType[this.typeSelected].name}` });
    this.meta.updateTag({ property: 'og:image', content: 'https://hsr.nandakho.my.id/assets/icon/icon.png' });
    this.meta.updateTag({ property: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ property: 'twitter:title', content: `Helper Star Rail - Effect ${this.whatType[this.typeSelected].name}` });
    this.meta.updateTag({ property: 'twitter:description', content: desc });
    this.meta.updateTag({ property: 'twitter:image', content: 'https://hsr.nandakho.my.id/assets/icon/icon.png' });
  }

  segmentChanged(ev:any) {
    this.myStats = {
      baseChance: 0,
      enemiesResist: 0,
      resistReduc: 0,
      ehr: 0,
    };
    this.result = {
      ehrNeeded: 0,
      realChance: 0
    }
    this.typeSelected = ev?.detail.value??0;
  }

  navCalc():void {
    const url = `/effect-hit-rate/${this.typeSelected}_${this.myStats.baseChance??0}_${this.myStats.enemiesResist??0}_${this.myStats.resistReduc??0}_${this.myStats.ehr??0}`;
    location.replace(url);
  }
}

interface ehrStats {
  baseChance: number,
  enemiesResist: number,
  resistReduc: number,
  ehr: number
}

interface result {
  realChance: number
  ehrNeeded: number
}

interface apiAddr {
  name: string,
  address: string
}