import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../models/user.model';
import { takeUntil } from 'rxjs';
import { Unsub } from '../unsub.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent extends Unsub {
  constructor() {
    super();
  }
  userService = inject(UserService);
  router = inject(Router);
  users: User[] = [];

  ngOnInit() {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  goToEmployeeDetails(id: number) {
    this.router.navigate(['/employee-details', id]);
  }
}
