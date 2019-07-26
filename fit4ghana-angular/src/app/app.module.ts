import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FamilyMemberComponent } from './family-member/family-member.component';
import { ChiefComponent } from './chief/chief.component';
import { ClsComponent } from './cls/cls.component';
import { LandCommissionComponent } from './land-commission/land-commission.component';
import { ExternalMemberComponent } from './external-member/external-member.component';
import { LandComponent } from './shared/land/land.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MarketplaceComponent } from './shared/marketplace/marketplace.component';

@NgModule({
  declarations: [
    AppComponent,
    FamilyMemberComponent,
    ChiefComponent,
    ClsComponent,
    LandCommissionComponent,
    ExternalMemberComponent,
    LandComponent,
    NavbarComponent,
    MarketplaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
