import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '@modules/admin/admin.component';
import { CurrenciesResolver } from '@modules/admin/resolvers/currencies.resolver';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    resolve: [CurrenciesResolver],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module.js').then(module => module.DashboardModule),
      },
      {
        path: 'users',
        children: [
          {
            path: 'staff',
            loadChildren: () => import('./pages/users/staff/staff.module').then(module => module.StaffModule),
          },
          {
            path: 'clients',
            children: [
              {
                path: '',
                loadChildren: () => import('./pages/users/clients/client-list/client-list.module').then(module => module.ClientListModule),
              },
              {
                path: ':id',
                loadChildren: () => import('./pages/users/clients/client-details/client-details.module')
                  .then(module => module.ClientDetailsModule),
              },
            ],
          },
          {
            path: 'merchants',
            children: [
              {
                path: '',
                loadChildren: () => import('./pages/users/merchants/merchant-list/merchant-list.module')
                  .then(module => module.MerchantListModule),
              },
              {
                path: ':id',
                loadChildren: () => import('./pages/users/merchants/merchant-details/merchant-details.module')
                  .then(module => module.MerchantDetailsModule),
              },
            ],
          },
        ],
      },
      {
        path: 'verification',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/verification/verification-list/verification-list.module')
              .then(module => module.VerificationListModule),
          },
          {
            path: ':id',
            loadChildren: () => import('./pages/verification/verification-details/verification-details.module')
              .then(module => module.VerificationDetailsModule),
          },
        ],
      },
      {
        path: 'security',
        loadChildren: () => import('./pages/security/security.module.js').then(module => module.SecurityModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(module => module.ProfileModule),
      },
      {
        path: 'notifications',
        loadChildren: () => import('./pages/notifications/notifications.module').then(module => module.NotificationsModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(module => module.SettingsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {

}
