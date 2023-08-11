import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './component/overview/overview.component';
import { SettingsComponent } from './component/settings/settings.component';
import { AddNewContactComponent } from './component/add-new-contact/add-new-contact.component';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'add-new-contact', component: AddNewContactComponent},
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
