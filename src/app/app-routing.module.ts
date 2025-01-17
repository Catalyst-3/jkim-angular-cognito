import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { AuthGuard, AuthAdminGuard } from "./auth/auth.guard";
import { UnauthorizedComponent } from "./pages/unauthorized/unauthorized.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
  },
  {
    path: "**",
    component: UnauthorizedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
