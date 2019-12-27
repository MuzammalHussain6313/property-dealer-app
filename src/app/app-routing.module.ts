import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    children: [
      {
        path: '',
        loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
      },
      {
        path: ':id',
        loadChildren: './detail/detail.module#DetailPageModule'
      }
      ]
  },
  {
    path: 'addProperty',
    loadChildren: () => import('./addProperty/addProperty.module').then(m => m.AddPropertyPageModule)
  },
  { path: 'setting', loadChildren: () => import('./setting/setting.module').then(m => m.SettingPageModule) },
  {
    path: 'update',
    children: [
      {
        path: '',
        loadChildren: './update/update.module#UpdatePageModule'
      },
      {
        path: ':id',
        loadChildren: './update/update.module#UpdatePageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
