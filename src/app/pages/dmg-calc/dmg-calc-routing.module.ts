import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DmgCalcPage } from './dmg-calc.page';

const routes: Routes = [
  {
    path: '',
    component: DmgCalcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DmgCalcPageRoutingModule {}
