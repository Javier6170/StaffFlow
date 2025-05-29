import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PersonLayoutComponent } from "./person-layout/person-layout.component";
import { PersonRegisterComponent } from './person-register/person-register.component';

@NgModule({
  declarations: [PersonLayoutComponent, PersonRegisterComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [PersonLayoutComponent]
})
export class PersonModule { }