import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportDateComponent } from './report-date/report-date.component';
import { MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatRadioModule, MatTableModule } from '@angular/material';
import { ButtonRunComponent } from './button-run/button-run.component';
import { reportAppsAndApisComponent } from './report-apps-apis/reportAppsAndApis.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';
import { ReportScopeComponent } from './report-scope/report-scope.component';
import { ReportAppsApisTeamsComponent } from './report-apps-apis-teams/report-apps-apis-teams.component';
import { ReportAppsOperationsComponent } from './report-apps-operations/report-apps-operations.component';




const appRoutes: Routes = [
  {path: 'home', component: ReportListComponent},
  {path: 'report/1', component: reportAppsAndApisComponent},
  {path: 'report/2', component: ReportAppsApisTeamsComponent},
  {path: 'report/3', component: ReportAppsOperationsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
 
];

@NgModule(
{
  
declarations: [
    AppComponent,
    ReportListComponent,
    ReportDetailComponent,
    ReportDateComponent,
    ButtonRunComponent,
    reportAppsAndApisComponent,
    ReportScopeComponent,
    ReportAppsApisTeamsComponent,
    ReportAppsOperationsComponent
  ],
  
imports: [
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  MatRadioModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  RouterModule.forRoot(appRoutes),
  HttpClientModule,
  MatTableModule
],

providers: [],
  bootstrap: [AppComponent] 
}
)
export class AppModule { }
