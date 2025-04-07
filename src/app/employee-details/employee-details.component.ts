import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { Unsub } from '../unsub.class';
import { User } from '../../models/user.model';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent extends Unsub {
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  user: User | undefined;

  ngOnInit(): void {
    if (this.id) {
      this.userService
        .getUserById(Number(this.id))
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (response) => {
            this.user = response;
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
  id = this.route.snapshot.paramMap.get('id');
}
