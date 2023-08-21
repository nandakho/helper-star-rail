import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DmgCalcPageRoutingModule } from './dmg-calc-routing.module';

import { DmgCalcPage } from './dmg-calc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DmgCalcPageRoutingModule
  ],
  declarations: [DmgCalcPage]
})
export class DmgCalcPageModule {}
