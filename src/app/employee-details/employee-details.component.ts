import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Unsub } from '../unsub.class';
import { User } from '../../models/user.model';
import { of, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgIf],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent extends Unsub {
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  user$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = Number(params.get('id'));
      return id ? this.userService.getUserById(id) : of(null);
    })
  );

  goBack() {
    this.router.navigate(['/employee']);
  }
}
