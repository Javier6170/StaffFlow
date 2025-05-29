import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { TokenInterceptor } from "../core/interceptor/token.interceptor";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [LoginComponent, RegisterComponent],
   providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class AuthModule { }