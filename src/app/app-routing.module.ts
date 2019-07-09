import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoggedGuard] },
  { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [AuthGuard] },
  { path: 'details/:id', loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [AuthGuard] },
  { path: 'evento', loadChildren: './pages/evento/evento.module#EventoPageModule', canActivate: [AuthGuard] },
  { path: 'painel', loadChildren: './pages/painel/painel.module#PainelPageModule', canActivate: [AuthGuard] },
  { path: 'painel/:id', loadChildren: './pages/painel/painel.module#PainelPageModule', canActivate: [AuthGuard] },
  { path: 'loginmail', loadChildren: './pages/loginmail/loginmail.module#LoginmailPageModule'},
  { path: 'evento/:id', loadChildren: './pages/evento/evento.module#EventoPageModule', canActivate: [AuthGuard] },
  { path: 'pag', loadChildren: './pages/pag/pag.module#PagPageModule', canActivate: [AuthGuard] }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }