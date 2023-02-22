import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './modules/auth/auth.module';
import { LanguageComponent } from './components/header/language/language.component';
import { ControlSidebarComponent } from './components/header/control-sidebar/control-sidebar.component';
import { FullscreenComponent } from './components/header/fullscreen/fullscreen.component';
import { SearchComponent } from './components/header/search/search.component';
import { MessagesComponent } from './components/header/messages/messages.component';
import { NotifyComponent } from './components/header/notify/notify.component';
import { CartNewComponent } from './components/header/cart-new/cart-new.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './modules/admin/admin.module';
import { SapModule } from './modules/sap/sap.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    LanguageComponent,
    ControlSidebarComponent,
    FullscreenComponent,
    SearchComponent,
    MessagesComponent,
    NotifyComponent,
    CartNewComponent,
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    AdminModule,
    SapModule,
    //-----------------
    AppRoutingModule,  //AppRoutingModule อยู่ด้านล่างเสมอ
  
  ],
  providers: [ AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
