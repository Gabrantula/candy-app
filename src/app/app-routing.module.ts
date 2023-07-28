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

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},

  {path: 'home', component: HomeComponent},

  {path: 'catalog', component: CatalogComponent},

  {path: 'login', component: LoginComponent},

  {path: 'register', component: RegisterComponent},

  {path: 'create', component: CreateComponent},

  {path: 'edit', component: EditComponent},

  {path: 'my-page', component: MyPageComponent},

  {path: 'details', component: DetailsComponent},

  {path: 'Gaby-page', component: GabyPageComponent},
  
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
