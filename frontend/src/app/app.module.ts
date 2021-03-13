import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditFormComponent } from './home/edit-form/edit-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ManageInvoiceComponent } from './manage-invoice/manage-invoice.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthServiceInterceptor } from './login/auth.interceptor.service';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CreatePageComponent,
    EditFormComponent,
   
    LoginComponent,
   
    ManageInvoiceComponent,
    
    
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
   MaterialModule,
   HttpClientModule,
   ReactiveFormsModule,
   FormsModule,
   ToastrModule.forRoot(),
  
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS,useClass:AuthServiceInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
