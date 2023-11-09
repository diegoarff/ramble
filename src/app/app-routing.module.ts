import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
      
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
      canActivate: [loginGuard]
  },
  {
    path: 'create-tweet',
    loadChildren: () => import('./pages/rambles/create-tweet/create-tweet.module').then( m => m.CreateTweetPageModule),
    canActivate: [loginGuard]

  },
  {
    path: 'ramble-views',
    loadChildren: () => import('./pages/rambles/ramble-views/ramble-views.module').then( m => m.RambleViewsPageModule),
    canActivate: [loginGuard]
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
