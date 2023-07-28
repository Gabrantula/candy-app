import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { MyPageComponent } from './my-page/my-page.component';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EditComponent,
    CreateComponent,
    MyPageComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    CreateComponent,
    EditComponent,
    MyPageComponent,
    DetailsComponent
  ]
})
export class ProfileModule { }
