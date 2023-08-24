import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EffectHitRatePage } from './effect-hit-rate.page';

const routes: Routes = [
  {
    path: '',
    component: EffectHitRatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EffectHitRatePageRoutingModule {}
