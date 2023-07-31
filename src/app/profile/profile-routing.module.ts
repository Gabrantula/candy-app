import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyPageComponent } from './my-page/my-page.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

// import { AuthActivate } from '../core/guards/auth.activate';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthActivate],
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [AuthActivate],
  },
  {
    path: 'my-page',
    component: MyPageComponent,
    // canActivate: [AuthActivate],
  },
  {
    path: 'create',
    component: CreateComponent,
    // canActivate: [AuthActivate],
  },
  {
    path: 'edit',
    component: EditComponent,
    // canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}