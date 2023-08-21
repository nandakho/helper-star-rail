import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-dmg-calc',
  templateUrl: './dmg-calc.page.html',
  styleUrls: ['./dmg-calc.page.scss'],
})
export class DmgCalcPage implements OnInit {
  apiUrl: string = `http://localhost:8080/hsr/dmg`;
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
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('attr');
    if(param){
      const attr = param.split("_");
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
      }
    }
  }

  async calculate(): Promise<void>{
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
      this.dmgResult.estdDmgOutput = response.data.estdDmgOutput?response.data.estdDmgOutput:0;
      this.dmgResult.estdCritDmgOutput = response.data.estdCritDmgOutput?response.data.estdCritDmgOutput:0;
    }
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