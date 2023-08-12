import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';

import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { GabyPageComponent } from './gaby-page/gaby-page.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
//import { appInterceptorProvider } from './_interceptors/app.interceptor';
import { SliderComponent } from './slider/slider.component';
import { CommentsComponent } from './comments/comments.component';
import { ProfileModule } from './profile/profile.module';

//import { authInterceptorProvider } from './_interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    CatalogComponent,
    NotFoundComponent,
    GabyPageComponent,
    SliderComponent,
    CommentsComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ProfileModule,
    RouterModule,
    AppRoutingModule,
    
  ],
 // providers: [appInterceptorProvider],//, authInterceptorProvider],
  //providers: [appInterceptorProvider, authInterceptorProvider, httpInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
