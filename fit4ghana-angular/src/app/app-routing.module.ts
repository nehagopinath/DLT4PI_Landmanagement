import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyMemberComponent } from './family-member/family-member.component';
import { ExternalMemberComponent } from './external-member/external-member.component';
import { ChiefComponent } from './chief/chief.component';
import { ClsComponent } from './cls/cls.component';
import { LandCommissionComponent } from './land-commission/land-commission.component';

const routes: Routes = [
  { path: 'family-member', component: FamilyMemberComponent },
  { path: 'external-member', component: ExternalMemberComponent },
  { path: 'chief', component: ChiefComponent },
  { path: 'cls', component: ClsComponent },
  { path: 'land-commission', component: LandCommissionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
