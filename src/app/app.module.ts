import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { GabyPageComponent } from './gaby-page/gaby-page.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { appInterceptorProvider } from './app.interceptor';
import { SliderComponent } from './slider/slider.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthenticateComponent,
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
    RouterModule,
    AppRoutingModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
