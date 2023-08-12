import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { MyPageComponent } from './my-page/my-page.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule} from './profile-routing.module'


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
   ProfileRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
  //  LoginComponent,
   // RegisterComponent,
  //  CreateComponent,
   // EditComponent,
  //  MyPageComponent,
  //  DetailsComponent
  ],

})
export class ProfileModule { }
