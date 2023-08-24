import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EffectHitRatePageRoutingModule } from './effect-hit-rate-routing.module';

import { EffectHitRatePage } from './effect-hit-rate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EffectHitRatePageRoutingModule
  ],
  declarations: [EffectHitRatePage]
})
export class EffectHitRatePageModule {}
