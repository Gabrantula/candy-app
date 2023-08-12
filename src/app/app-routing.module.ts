import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { LoginComponent } from './profile/login/login.component';
import { RegisterComponent } from './profile/register/register.component';
import { CreateComponent } from './profile/create/create.component';
import { EditComponent } from './profile/edit/edit.component';
import { MyPageComponent } from './profile/my-page/my-page.component';
import { DetailsComponent } from './profile/details/details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GabyPageComponent } from './gaby-page/gaby-page.component';
import { ErrorComponent } from './core/error/error.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},

  {path: 'home', component: HomeComponent},

 // {path: 'themes', component: CatalogComponent},

  {path: 'auth',
   loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),},

   {path: 'Gaby-page', component: GabyPageComponent},

  {path: 'error', component: ErrorComponent},
  
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
