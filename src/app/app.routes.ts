import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';
import { RoleEnum } from './shared/enums/role.enum';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent) },
  { path: 'auth/login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'auth/register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
  {
    path: 'bookings',
    canActivate: [roleGuard(RoleEnum.ALUMNO, RoleEnum.ADMIN, RoleEnum.SUPERADMIN)],
    loadComponent: () => import('./features/bookings/booking-history/booking-history.component').then(m => m.BookingHistoryComponent),
  },
  {
    path: 'admin',
    canActivate: [roleGuard(RoleEnum.ADMIN, RoleEnum.SUPERADMIN)],
    loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
  },
  {
    path: 'admin/attendance',
    canActivate: [roleGuard(RoleEnum.ADMIN, RoleEnum.SUPERADMIN)],
    loadComponent: () => import('./features/admin/attendance/attendance.component').then(m => m.AttendanceComponent),
  },
  {
    path: 'superadmin',
    canActivate: [roleGuard(RoleEnum.SUPERADMIN)],
    loadComponent: () => import('./features/superadmin/superadmin-dashboard/superadmin-dashboard.component').then(m => m.SuperadminDashboardComponent),
  },
  {
    path: 'superadmin/roles',
    canActivate: [roleGuard(RoleEnum.SUPERADMIN)],
    loadComponent: () => import('./features/superadmin/role-management/role-management.component').then(m => m.RoleManagementComponent),
  },
  { path: '**', redirectTo: '' },
];
