import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './component/overview/overview.component';
import { NavComponent } from './component/nav/nav.component';
import { ContactComponent } from './component/contact/contact.component';
import { SettingsComponent } from './component/settings/settings.component';
import { AddNewContactComponent } from './component/add-new-contact/add-new-contact.component';
import { FormComponent } from './component/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    NavComponent,
    ContactComponent,
    SettingsComponent,
    AddNewContactComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
