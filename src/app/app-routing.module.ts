import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Z_FULL_FLUSH } from 'zlib';
import { Usuario } from '../interfaces/interfaces';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [UsuarioGuard]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  /* en el path del login es el path por defecto */
  {path: '', pathMatch: 'full', redirectTo: 'login'},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
