import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FamilyMemberComponent } from './family-member/family-member.component';
import { ChiefComponent } from './chief/chief.component';
import { ClsComponent } from './cls/cls.component';
import { LandCommissionComponent } from './land-commission/land-commission.component';
import { ExternalMemberComponent } from './external-member/external-member.component';
import { LandComponent } from './shared/land/land.component';

@NgModule({
  declarations: [
    AppComponent,
    FamilyMemberComponent,
    ChiefComponent,
    ClsComponent,
    LandCommissionComponent,
    ExternalMemberComponent,
    LandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }