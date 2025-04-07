import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  {
    path: 'employee',
    loadComponent: () =>
      import('./employee-list/employee-list.component').then(
        (m) => m.EmployeeListComponent
      ),
  },
  {
    path: 'employee/:id',
    loadComponent: () =>
      import('./employee-details/employee-details.component').then(
        (m) => m.EmployeeDetailsComponent
      ),
  },
  // { path: 'employee/:id/edit', loadComponent: () => import('./employee/edit-employee.component').then(m => m.EditEmployeeComponent) },
  // { path: 'employee-create', loadComponent: () => import('./employee/create-employee.component').then(m => m.CreateEmployeeComponent) },
  // { path: 'work', loadComponent: () => import('./work/work.component').then(m => m.WorkComponent) },
  // { path: 'recruitment', loadComponent: () => import('./recruitment/recruitment.component').then(m => m.RecruitmentComponent) },
];
