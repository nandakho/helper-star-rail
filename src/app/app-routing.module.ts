import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'dmg-calc',
    loadChildren: () => import('./pages/dmg-calc/dmg-calc.module').then( m => m.DmgCalcPageModule)
  },
  {
    path: 'dmg-calc/:attr',
    loadChildren: () => import('./pages/dmg-calc/dmg-calc.module').then( m => m.DmgCalcPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
