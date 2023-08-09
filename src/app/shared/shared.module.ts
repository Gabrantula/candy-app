import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AppEmailDirective } from './validators/app-email.directive';
import { AppEditDirective } from './validators/app-edit.directive';



@NgModule({
  declarations: [
    LoaderComponent,
    AppEmailDirective,
    AppEditDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent, AppEmailDirective, AppEditDirective]
})
export class SharedModule { }
