import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BillingComponent } from './pages/billing/billing.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { RulesEngineComponent } from './pages/rules-engine/rules-engine.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "rules-engine",
        component: RulesEngineComponent
    },
    {
        path: "accounts",
        component: AccountsComponent
    },
    {
        path: "billing",
        component: BillingComponent
    },
    {
        path: "user-management",
        component: UserManagementComponent
    },
    {
        path: "settings",
        component: SettingsComponent
    },
   
];
